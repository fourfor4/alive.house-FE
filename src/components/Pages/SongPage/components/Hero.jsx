import React from "react";

import SideBar from "./SideBar";
import mute from "../../../../assets/SongHomePage/icons/Mute_Stroke.svg";
import volume from "../../../../assets/SongHomePage/VolumeUp_Stroke.svg";
import Nav from "../../HomeScreenPage/components/Nav";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";
import { memo } from "react";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import { unityContext } from "../../../Webgl/FlyingThrough";
import {
  changebuttonState,
  changeMultiplayerState,
  changeUnityButtonState,
  changeUnityVisibility,
  useIsButtonClicked,
  useShowUnity,
} from "../../../../globalStates/Home";

const Hero = ({ data, disable }) => {
  const videoEl = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [isMute, setIsMute] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const { _t } = useAnalytics();
  const unityState = useHookstate(useShowUnity());
  const buttonState = useHookstate(useIsButtonClicked());

  const attemptPlay = async () => {
    videoEl &&
      videoEl.current &&
      videoEl.current
        .play()
        .then(() => {
          setDuration(videoEl.current.duration);
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error attempting to play", error);
          setIsPlaying(false);
        });
  };

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1500);
    attemptPlay();
  }, []);

  React.useEffect(() => {
    if (unityState?.value) {
      videoEl.current.pause();
    } else {
      videoEl.current.play();
    }
  }, [unityState?.value]);

  const enterWorld = (flag) => {
    _t("SUCCESS:ENTER WORLD:CLICK");
    changeUnityVisibility(true);
    changebuttonState(true);
    changeMultiplayerState(flag);
  };

  return (
    <div className="h-screen bg-white border-b border-gray relative">
      <Nav />
      <SideBar
        open={open}
        isPlaying={isPlaying}
        duration={duration}
        setOpen={setOpen}
        enterWorld={enterWorld}
        data={data}
        disable={disable}
      />
      <div className="h-[calc(100%-80px)]  flex items-center justify-center overflow-hidden">
        <video
          onClick={() => open === true && setOpen(false)}
          playsInline
          loop
          muted={isMute}
          alt="All the devices"
          src="https://cdn.alive.house/artist/esabalu/EsaforWeb.mp4"
          ref={videoEl}
        />
      </div>
      <button
        onClick={() => setIsMute(!isMute)}
        style={{ fontFamily: "Nuform Sans" }}
        className="w-[12rem] text-gray text-[20px] border border-gray flex justify-center items-center gap-[1rem]  h-[4.5rem] bg-white absolute bottom-[4rem] right-[4rem]"
      >
        <p style={{ fontFamily: "Nuform Sans" }} className="mt-[-3px]">
          {!isMute ? "mute" : "unmute"}
        </p>
        <img src={!isMute ? mute : volume} className="h-[2rem]" />
      </button>
    </div>
  );
};

export default memo(Hero);
