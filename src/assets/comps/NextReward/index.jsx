import { useHookstate } from "@hookstate/core";
import React from "react";
import { memo } from "react";
import { useUserDetails } from "../../../globalStates/Home";
import playerStar from "../../../public/Images/playerStar.svg";

const NextReward = () => {
  const detailsState = useHookstate(useUserDetails());
  return (
    <div className="relative flex items-center mt-[7px]">
      <img src={playerStar} className="h-[55px] z-[200]" />
      <div className="flex gap-[1px] bg-white items-center justify-start w-[25rem] h-[30px] ml-[-13px] border border-gray">
        {Array(10 - detailsState?.nextAt?.value)
          .fill()
          .map((_, idx) => (
            <div key={idx} className="w-[2.5rem] h-[26px] bg-green"></div>
          ))}
      </div>
      <p
        style={{ fontFamily: "Nuform Sans" }}
        className="text-[24px] absolute z-[300] top-[10px] left-[15px]"
      >
        {detailsState?.rewardStat?.value}
      </p>
      <p
        style={{ fontFamily: "Nuform Sans" }}
        className="text-[24px] absolute top-[8px] left-[60px]"
      >
        next reward at {detailsState?.nextAt?.value}/10
      </p>
    </div>
  );
};

export default memo(NextReward);
