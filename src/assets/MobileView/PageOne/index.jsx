import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import "./index.scss";
import dropdown from "../Images/dropdown.png";
import logo from "../../commonImg/logo.png";
import thumbnail from "../Images/thumbnail.png";
import whiteContainer from "../Images/whitecontainer.png";
import button from "../Images/button.png";
import { changeMobileViewPage } from "../../../globalHooks";
import cassete from "../../AudioPage/Images/Rotatingcassete.gif";
import stem from "../Images/stem.svg";
import demo from "../Images/demo.svg";
import lyrics from "../Images/lyrics.svg";
import filter from "../Images/filter.svg";
import music from "../Images/music.svg";
import star from "../Images/star.svg";

const index = () => {
  const animation = useAnimation();
  const [closeShutter, setCloseShutter] = useState(false);
  const [changePage, setChangePage] = useState(false);
  const handlers = useSwipeable({
    onSwipedUp: () => setCloseShutter(true),
  });

  // useEffect(() => {
  //   if (changePage) {
  //     changeMobileViewPage("pagetwo");
  //   }
  // }, [changePage]);

  useEffect(() => {
    if (closeShutter) {
      animation.start({
        transform: "translateY(-100vh)",
        transition: {
          duration: 0.4,
          stiffness: 80,
        },
      });
    }
  }, [closeShutter]);

  return (
    <>
      <motion.div
        {...handlers}
        initial={{ transform: "translateY(0)" }}
        animate={animation}
        className="mobileView_container_shutter"
        onClick={() => setCloseShutter(true)}
      >
        <div className="mobileView_container_shutter_logo_conatiner">
          <div className="mobileView_container_shutter_logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="mobileView_container_shutter_logo_title">
            <h1>Every Song is a World.</h1>
          </div>
        </div>
        <div className="mobileView_shutter_img_container">
          <img src={dropdown} alt="dropdown" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{ opacity: 0 }}
        className="mobileView_content_container"
      >
        <div className="mobileView_content_container_inner">
          <h1>Claim for free!</h1>
          <div className="about_section">
            <div className="about_container">
              <div className="thumbnail">
                <img src={thumbnail} alt="thumbnail" />
              </div>
              <div className="about_container one">
                <div className="about_container_one_wrapper">
                  <h3>HUYANA</h3>
                  <h1>IS IT YOU?</h1>
                </div>
              </div>
              <div className="about_container two">
                <p>
                  Huyana allas, Varshita Ramesh is a singer-songwritter from
                  Chennai,India. Predominantly a jazz, soul and blues vocalist,
                  Huyana dobbles with various other generes when it comes to her
                  original music.With each release she explores and experiments
                  with different styles of songwriting, soundscopes and
                  production.
                </p>
              </div>
            </div>
          </div>
          <div className="experience_edition">
            <img src={whiteContainer} alt="container" />
          </div>
          <div
            className="claim_button"
            onClick={() => changeMobileViewPage("pagetwo")}
          >
            <img src={button} alt="button" />
            <h2>Claim this edition</h2>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default index;
