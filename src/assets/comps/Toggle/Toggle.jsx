import React from "react";
import rupee from "../../../public/Images/rupee.svg";
import rupeeSign from "../../../public/Images/rupeesign.svg";
import dollar from "../../../public/Images/dollar.svg";
import dollarSign from "../../../public/Images/dollarsign.svg";
import matic from "../../../public/Images/matic.svg";
import maticSign from "../../../public/Images/maticsign.svg";

const Toggle = ({ state, setAsNativeCurrency, isIndian }) => {
  return (
    <div
      className="w-full h-full flex items-center cursor-pointer"
      onClick={() => setAsNativeCurrency(!state)}
    >
      {state ? (
        <div className="w-1/2 h-full flex items-center justify-center z-10">
          {isIndian ? (
            <img
              src={rupee}
              alt="rupee"
              className="w-full h-full object-contain "
            />
          ) : (
            <img
              src={dollar}
              alt="rupee"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      ) : (
        <div className="w-1/2 h-[28px] flex items-center justify-center bg-white border translate-x-2 p-2">
          {isIndian ? (
            <img
              src={rupeeSign}
              alt="rupee"
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={dollarSign}
              alt="rupee"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      )}
      {state ? (
        <div className="w-1/2 h-[28px] bg-white flex items-center justify-center border -translate-x-2 p-2">
          <img
            src={maticSign}
            alt="matic"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="w-1/2 h-full bg-white flex items-center justify-center z-10">
          <img
            src={matic}
            alt="matic"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Toggle;
