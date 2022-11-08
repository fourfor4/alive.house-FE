import { useHookstate } from "@hookstate/core";
import React from "react";
import { memo } from "react";

const HomePageToolTip = ({ title, source, data }) => {
  const titleState = useHookstate(title);
  return (
    <div className="w-[42rem] border border-gray opacity-100 h-fit py-10 bg-white">
      <div className="flex justify-center">
        <div className="h-[7rem] w-[90%] border-b border-gray flex gap-[2rem]  items-center">
          <img src={source} />
          <p
            style={{
              fontFamily: "Nuform Sans",
              fontSize: "30px",
            }}
          >
            {titleState?.value}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-[1rem]">
        <p className="w-[90%]" style={{ fontFamily: "Nuform Sans" }}>
          {data}
        </p>
      </div>
    </div>
  );
};

export default memo(HomePageToolTip);
