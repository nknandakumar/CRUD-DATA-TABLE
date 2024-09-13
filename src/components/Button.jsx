import React from "react";

const Button = ({ color = "blue", name,click }) => {
  let bgColor = "bg-blue-600";
  let hoverBgColor = "hover:bg-blue-400";

  if (color === "red") {
    bgColor = "bg-red-600";
    hoverBgColor = "hover:bg-red-400";
  } else if (color === "green") {
    bgColor = "bg-green-600";
    hoverBgColor = "hover:bg-green-400";
  }
  // Add more color conditions if needed

  const style = `px-4 py-2 rounded-lg font-semibold font-sans cursor-pointer ${bgColor} text-white ${hoverBgColor}`;

  return <div onClick={click} className={style}>{name}</div>;
};

export default Button;
