import React from "react";
import arrowright from "../../SongHomePage/arrowright.svg";

const index = ({ jumpFunctionality }) => {
  return (
    <button
      onClick={jumpFunctionality}
      style={{ fontFamily: "Nuform Sans" }}
      className="mb-[1rem] fixed right-[2rem] bottom-[2rem] h-[48px] border border-black w-[100px] text-gray flex items-center justify-center gap-[1rem] text-[16px] bg-yellow z-30"
    >
      top <img src={arrowright} className="-rotate-90 translate-y-1" />
    </button>
  );
};

export default index;
