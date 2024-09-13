import Button from "./Button";
import { useState } from "react";

const DataTable = () => {
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [data, setData] = useState([
    { name: "Nandan", gender: "Male", age: "55" },
    { name: "kpokk", gender: "Female", age: "55" },
    { name: "prathk", gender: "Male", age: "15" },
    { name: "veeresh", gender: "Male", age: "66" },
    { name: "malvika", gender: "Female", age: "23" },
    { name: "trisha", gender: "Female", age: "35" },
    { name: "vijay ", gender: "Male", age: "50" },
    { name: "vijay antony", gender: "Male", age: "44" },
  ]);
  const [editingId, setEditingId] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId === false) {
      setData([...data, formData]);
    } else {
      const updatedData = [...data];
      updatedData[editingId] = formData;
      setData(updatedData);
      setEditingId(false);
    }
    setFormData({ name: "", gender: "", age: "" });
  };

  const handleDelete = (index) => {
    const updatedList = data.filter((_, i) => i !== index);
    setData(updatedList);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleEditClick = (index) => {
    setEditingId(index);
    setFormData(data[index]);
  };

  const handleCancelEdit = () => {
    setEditingId(false);
    setFormData({ name: "", gender: "", age: "" });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col justify-center items-center pt-10 px-8">
      {/* Input Section */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-8 pb-20 flex-wrap">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            className="Input"
            onChange={handleInputChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            className="Input"
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="age"
            value={formData.age}
            placeholder="Age"
            className="Input"
            onChange={(e) => {
              const value = e.target.value.slice(0, 2);
              setFormData({ ...formData, [e.target.name]: value });
            }}
            min="5"
            max="100"
            required
          />
          <button>
            <Button name={editingId === false ? "ADD" : "SAVE"} />
          </button>
          {editingId !== false && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table Section */}
      <div className="flex flex-col justify-center items-center gap-6">
        {/* Search Filter */}
        <input
          type="text"
          value={search}
          className="Input pb-8 text-black max-w-lg"
          placeholder="Search..."
          onChange={handleSearch}
        />
        {/* Table */}
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-300">
                <th className="w-1/4 py-4 px-2 md:px-6 text-left text-gray-600 font-bold uppercase">
                  Name
                </th>
                <th className="w-1/4 py-4 px-2 md:px-6 text-left text-gray-600 font-bold uppercase">
                  Gender
                </th>
                <th className="w-1/4 py-4 px-2 md:px-6 text-left text-gray-600 font-bold uppercase">
                  Age
                </th>
                <th className="w-1/4 py-4 px-2 md:px-6 text-left text-gray-600 font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-4 px-2 md:px-6 border-b border-gray-700">
                    {editingId === index ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="Input"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="py-4 px-2 md:px-6 border-b border-gray-700">
                    {editingId === index ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="Input"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      item.gender
                    )}
                  </td>
                  <td className="py-4 px-2 md:px-6 border-b border-gray-700">
                    {editingId === index ? (
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="Input"
                        min="5"
                        max="100"
                      />
                    ) : (
                      item.age
                    )}
                  </td>
                  <td className="py-4 px-2 md:px-6 border-b border-gray-700 flex gap-2 justify-start md:justify-center">
                    {editingId === index ? (
                      <>
                        <Button name="Save" color="blue" click={handleSubmit} />
                        <Button
                          name="Cancel"
                          color="gray"
                          click={handleCancelEdit}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          click={() => handleEditClick(index)}
                          name="Edit"
                          color="green"
                        />
                        <Button
                          click={() => handleDelete(index)}
                          name="Delete"
                          color="red"
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="m-4 p-2 text-lg bg-slate-500 flex justify-center">
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
 