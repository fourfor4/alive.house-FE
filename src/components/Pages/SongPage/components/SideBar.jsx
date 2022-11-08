import { useHookstate } from "@hookstate/core";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useChangeUnityLoaded } from "../../../../globalStates/Home/index";
import LaunchTimer from "../../../../assets/comps/LaunchTimer";
import useSongLaunch from "../../../../hooks/use-song-launch";
import { useLocation } from "react-router-dom";

const SideBar = ({
  open,
  duration,
  setOpen,
  enterWorld,
  data,
  isPlaying,
  disable,
}) => {
  // const localState = useHookstate(data);
  const [buyNowVisibility, setBuyNowVisibility] = useState(false);
  const { launchDataCopy } = useSongLaunch();
  const search = useLocation().search;
  const [testbuttons, setTestButtons] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const query = new URLSearchParams(search).get("webglTestServer");
    if (query) {
      setTestButtons(true);
    }
  }, []);

  return (
    <div>
      <div className="left-[0] bg-white   w-[5rem]   absolute h-[calc(100%-80px)]"></div>
      <div
        className={`left-[0]  flex items-center  justify-center  top-[40px] absolute h-[calc(100%)]`}
      >
        <div
          className={`min-h-[calc(100%-80px)] ${
            !open && "bounce-right"
          }   flex flex-col items-center justify-center   sidebarborder cursor-pointer transition-all px-[4rem]  duration-500 ${
            open ? "w-[28vw]" : " w-[15rem]"
          } bg-white`}
        >
          <div
            className={` relative h-[calc(100%-80px)] flex flex-col items-center ${
              open ? "justify-between" : "justify-center"
            }`}
          >
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className={`${
                open ? "hidden" : "opaticy-100"
              } text-gray bottom-[0]  text-[54px] w-[calc(100vh-160px)] rotate-[-90deg] text-center leading-none`}
            >
              {data?.song_onboarding?.title?.value}
            </p>
            <div
              className={`${
                open ? "" : "hidden"
              } transition-all duration-500 z-[100]`}
            >
              <Card data={data} duration={duration} isPlaying={isPlaying} />
            </div>
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className={`${
                open ? "" : "hidden"
              } w-[35rem] mt-[1rem] leading-[1.2] text-[16px] text-center`}
            >
              {data?.song_onboarding?.description?.value}
            </p>
            {testbuttons && (
              <button
                onClick={() => enterWorld(false)}
                className="absolute bottom-0 -right-10 z-30 bg-red w-32 h-10"
              >
                Enter world test
              </button>
            )}
            {testbuttons && (
              <button
                onClick={() => enterWorld(true)}
                className="absolute bottom-16 -right-10 z-30 bg-green w-32 h-10"
              >
                Enter world test
              </button>
            )}
            {buyNowVisibility ? (
              <button
                onClick={enterWorld}
                style={{
                  fontFamily: "Nuform Sans",
                  opacity: disable ? 0.3 : "",
                  cursor: disable ? "not-allowed" : "",
                }}
                className={`${
                  open
                    ? "min-h-[64px] mt-[2rem] border border-black w-[280px] text-gray text-[30px] bg-yellow z-40"
                    : "hidden"
                }`}
              >
                enter world
              </button>
            ) : (
              <div className={`${open ? "" : "hidden"} scale-[0.8] w-full`}>
                <LaunchTimer
                  // launchTime={
                  //   launchDataCopy?.data?.[0]?.attributes?.launchTime?.value
                  // }
                  launchTime={launchDataCopy?.[0]?.launchTime?.value}
                  setBuyNowVisibility={setBuyNowVisibility}
                />
              </div>
            )}
          </div>
        </div>
        <div onClick={handleClick} className=" z-[100]">
          <div
            style={{ clipPath: "polygon(28.9% 50%, 0% 100%, 0% 0%)" }}
            className={`${open ? "opacity-0" : "opaticy-100"} ${
              !open && "bounce-right-shape"
            } relative transition-all duration-300 cursor-pointer bg-gray ml-[4.1rem] flex items-center justify-start h-[12.2rem] w-[17.2rem] `}
          >
            <div
              style={{ clipPath: "polygon(28.9% 50%, 0% 100%, 0% 0%)" }}
              className={` transition-all z-[300] duration-300 bg-green h-[12rem]  w-[17rem] `}
            ></div>
            <div className="absolute h-[15rem] bg-green z-[400] w-[15px] top-[0] left-[-10px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
