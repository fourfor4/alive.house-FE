import React from "react";
import NextReward from "../../../../assets/comps/NextReward";
import ScoreBox from "../../../../assets/comps/ScoreBox";
import Badge from "../../../../assets/SongHomePage/HomePageAfterLogin/Badge.svg";

const Stats = () => {
  return (
    <div>
      <div className="h-[70px] border-b border-gray bg-red relative">
        {/* <img src={Badge} className="absolute h-[2.5rem] top-[-12px] right-[8%]" /> */}
        <div className="flex justify-end h-[70px] items-center">
          <div className="w-[136px] h-[36px]  mr-10">
            <ScoreBox />
          </div>
          {/* <div className="mr-[5rem]">
            <NextReward />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Stats;
