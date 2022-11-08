import React from "react";
import chara from "../../../../assets/SongHomePage/chara.png";
import {
  StatsCard,
  StatsCardAdd,
  StatsImgCard,
} from "../../HomePageAfterLogin/components/StatsCard";
import { EffectsContext } from "../Context/Context";
import { useUserDetails } from "../../../../globalStates/Home";

const HeroSection = () => {
  const { effects, isFill, handleEffectRemove } =
    React.useContext(EffectsContext);

  return (
    <div className="min-h-[100vh] bg-gray relative">
      <img
        src={chara}
        className="absolute w-[40vw] top-[-8rem] right-[30rem]"
      />
      <div className="flex flex-col justify-center h-[100vh] ml-[5rem]">
        <p
          style={{ fontFamily: "Nuform Sans" }}
          className="text-[100px] text-red"
        >
          hello
        </p>
        <p
          style={{ fontFamily: "Nuform Sans" }}
          className="mt-[-6rem] z-[4] text-[100px] text-red"
        >
          {useUserDetails()?.name?.value}
        </p>
      </div>
      <div className="w-[98vw]  h-[28vh] bg-green absolute bottom-[0px]">
        <div className="w-[98vw] flex justify-center items-center h-[28vh] relative">
          <div className="effectboxafter1 bg-yellow absolute top-[0] right-[-15px]"></div>
          <div className="effectboxafter2holder absolute left-[0] bottom-[-15px]">
            <div className="effectboxafter2 bg-white"></div>
          </div>

          <div className="flex justify-left gap-[2rem] w-[90vw]">
            <div className="flex flex-col ">
              <div className="flex gap-[2rem]">
                {effects.map((e, i) => {
                  if (i < 3) {
                    if (e.img === "1") {
                      if (isFill) {
                        return (
                          <StatsImgCard
                            key={i}
                            handleEffectRemove={handleEffectRemove}
                            id={e.id}
                            shake
                            dark
                          />
                        );
                      } else {
                        return (
                          <StatsImgCard
                            key={i}
                            handleEffectRemove={handleEffectRemove}
                            id={e.id}
                            dark
                          />
                        );
                      }
                    }
                  }
                })}
                {[...Array(3 - effects.length)].map((x, i) => (
                  <StatsCard key={i} dark />
                ))}
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex gap-[2rem]">
                <StatsCardAdd dark />
                <StatsCardAdd dark />
                <StatsCardAdd dark />
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex gap-[2rem]">
                <StatsCardAdd dark />
                <StatsCardAdd dark />
                <StatsCardAdd dark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
