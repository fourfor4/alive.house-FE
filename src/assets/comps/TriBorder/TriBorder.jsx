import React from "react";

const TriBorder = ({ height }) => {
  return (
    <div style={{ height: height }} className="w-full flex flex-col">
      <div className="h-1/3 w-full bg-red"></div>
      <div className="h-1/3 w-full bg-yellow"></div>
      <div className="h-1/3 w-full bg-green"></div>
    </div>
  );
};

export default TriBorder;
