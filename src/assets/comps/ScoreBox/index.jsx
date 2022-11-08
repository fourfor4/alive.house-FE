import React from "react";
import { memo } from "react";
import SocreLevel from "./ScoreLevel";
import casette from '../../../public/Images/scorecassete.svg'

const ScoreBox = () => {
  return (
    <div className="w-full h-full bg-green relative flex items-center justify-end">
      <div className="absolute -top-1 -left-1 w-[64px] h-[42px]">
        <img src={casette} alt="score" />
      </div>
      <SocreLevel />
    </div>
  );
};

export default memo(ScoreBox);
