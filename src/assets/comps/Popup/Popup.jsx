import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { setShowPopup, useShowPopUp } from "../../../globalStates/Home";
import close from "../../../assets/SongHomePage/Close_Stroke.svg";

const Popup = (props) => {
  //   useEffect(() => {
  //     window.onscroll = function () {
  //       window.scrollTo(0, 0);
  //     };
  //     return () => {
  //       window.onscroll = function () {};
  //     };
  //   });

  return (
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      className=" w-fit min-w-[100vw] h-[100vh] overflow-hidden absolute top-0 z-[500] left-0 flex justify-center items-center"
      onClick={() => props.close(false)}
    >
      <div className="w-full h-full bg-black opacity-90 absolute top-0"></div>
      <div className="w-full h-full absolute top-0 grid place-items-center">
        {props.children}
      </div>
      <div
        className="absolute top-10 right-10 w-10 h-10 z-40"
        onClick={() => props.close(false)}
      >
        <img
          style={{ filter: "invert(100%)" }}
          src={close}
          className=" w-full h-full object-contain"
          alt="close button"
        />
      </div>
    </motion.div>
  );
};

export default Popup;
