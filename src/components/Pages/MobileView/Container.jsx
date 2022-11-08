import React, { useEffect, useState } from "react";
import PageOne from "../../assets/MobileView/PageOne";
import PageTwo from "../../assets/MobileView/PageTwo";
import PageThree from "../../assets/MobileView/PageThree";
import { useMobileViewPageInfo } from "../../globalHooks";
import { AnimatePresence } from "framer-motion";
// import { getAllDetails } from "../../redux/actions/Home";

const Container = () => {
  // useEffect(() => {
  //   const userID = localStorage.getItem("userid");
  //   if (userID) {
  //     getAllDetails(userID);
  //   }
  // }, []);

  return (
    <div className="mobileView_container">
      <AnimatePresence exitBeforeEnter>
        {useMobileViewPageInfo().get() === "pageone" && <PageOne />}
        {useMobileViewPageInfo().get() === "pagetwo" && <PageTwo />}
        {useMobileViewPageInfo().get() === "pagethree" && <PageThree />}
      </AnimatePresence>
    </div>
  );
};

export default Container;
