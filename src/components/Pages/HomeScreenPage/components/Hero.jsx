import React from "react";
import Nav from "./Nav";
import { motion } from "framer-motion";
import { setErrorMessage } from "../../../../hooks/useErrors";
import ErrorModal from "../../../../Modals/ErrorModal";
import { memo } from "react";
import { Link } from "react-router-dom";
import mute from "../../../../assets/SongHomePage/icons/Mute_Stroke.svg";
import volume from "../../../../assets/SongHomePage/VolumeUp_Stroke.svg";
import Cookies from "./Cookies";

const Hero = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const videoEl = React.useRef(null);
  const [isMute, setIsMute] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        setTimeout(() => {
          setErrorMessage({
            title: "Error attempting to play",
            message: `${error.message}`,
          });
        }, 500);
      });
  };

  React.useEffect(() => {
    setTimeout(() => {
      attemptPlay();
    }, 100);

    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <ErrorModal />
      <div className="h-screen bg-white ">
        <Nav />
        <div className="h-[calc(100%-80px)]  flex items-center justify-center overflow-hidden relative">
          <motion.div className="alivevideo" layout data-isopen={isOpen}>
            <video
              playsInline
              loop
              muted={isMute}
              alt="All the devices"
              src="https://cdn.alive.house/common/a.live_home.mp4"
              ref={videoEl}
            />
          </motion.div>
          <button
            onClick={() => setIsMute(!isMute)}
            style={{ fontFamily: "Nuform Sans" }}
            className="w-[12rem] text-gray text-[20px] border border-gray flex justify-center items-center gap-[1rem]  h-[4.5rem] bg-white absolute top-[80vh] right-[4rem]"
          >
            <p style={{ fontFamily: "Nuform Sans" }} className="mt-[-3px]">
              {!isMute ? "mute" : "unmute"}
            </p>
            <img src={!isMute ? mute : volume} className="h-[2rem]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Hero);
