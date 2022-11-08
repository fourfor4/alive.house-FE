import React from "react";
import world from "../../../../assets/SongHomePage/world.png";
import every from "../../../../assets/SongHomePage/textsvg/every.svg";
import song from "../../../../assets/SongHomePage/textsvg/song.svg";
import isa from "../../../../assets/SongHomePage/textsvg/isa.svg";
import worldtext from "../../../../assets/SongHomePage/textsvg/world.svg";
import Social from "./Social";
import arrowright from "../../../../assets/SongHomePage/arrowright.svg";

const EverySong = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className=" h-1/4 border-y border-black bg-green flex items-center relative  justify-center">
        <img
          data-aos="fade-right"
          src={every}
          className="h-3/4 absolute left-[16rem]"
        />
        <img
          data-aos="fade-right"
          src={world}
          className="h-[15rem]  absolute right-[3rem]"
        />
      </div>
      <div className=" h-1/4 border-b border-black bg-yellow flex items-center relative  justify-center">
        <img data-aos="fade-left" src={song} className="h-3/4 " />
      </div>
      <div className="  h-1/4 border-b border-black bg-white flex items-center relative  justify-center">
        <img
          src={isa}
          data-aos="fade-right"
          className="h-3/4 absolute left-[24rem]"
        />
      </div>
      <div className="  h-1/4 border-b border-black bg-red flex items-center relative  justify-center">
        <img data-aos="fade-left" src={worldtext} className="h-3/4 " />
        <div className="absolute right-[10rem] bottom-[2rem] flex items-end">
          <Social classname="h-[2.5rem]" />
        </div>
      </div>
    </div>
  );
};

export default EverySong;
