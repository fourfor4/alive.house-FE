import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Laylo = ({ showLaylo }) => {
  //   useEffect(() => {
  //     window.onscroll = function () {
  //       window.scrollTo(0, 0);
  //     };
  //     return () => {
  //       window.onscroll = function () {};
  //     };
  //   });

  return (
    <iframe
      src="https://laylo.com/huyana/profile/embed?background=transparent&&customTitle=huyana"
      width="70%"
      height="35%"
      frameborder="1"
      scrolling="no"
      allowtransparency={false}
      className="absolute top-1/3 bg-white"
      onClick={(e) => e.stopPropagation()}
    ></iframe>
  );
};

export default Laylo;
