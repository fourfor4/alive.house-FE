import {
  createState,
  useHookstate,
  useState as HookState,
} from "@hookstate/core";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Nav from "../../components/Pages/HomeScreenPage/components/Nav";
import { changeEndScore, useStartScore } from "../../globalStates/Score";
import NextReward from "../comps/NextReward";
import ScoreBox from "../comps/ScoreBox";
import TopCards from "./TopCards";
import TopPoints from "./TopPoints";
import TopText from "./TopText";

const Index = () => {
  const [index, setIndex] = useState(1);
  const [shiftBottom, setShiftBottom] = useState(false);
  const [start, setStart] = useState(420);
  const [end, setEnd] = useState(0);

  const variants = {
    firstShow: { transform: "translateY(100vh)", transition: { duration: 2 } },
    secondShow: {
      transform: "translateY(-10vh)",
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setShiftBottom(true);
    }, 1000);
  }, [shiftBottom]);

  useEffect(() => {
    if (shiftBottom) {
      setTimeout(() => {
        changeIndex(index);
      }, 2000);
    }
  }, [index, shiftBottom]);

  useEffect(() => {
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };
    return () => {
      window.onscroll = function () {};
    };
  });

  const changeScore = (score) => {
    changeEndScore(parseInt(score));
  };

  const changeIndex = (index) => {
    if (index >= 3) {
      return;
    } else {
      if (index === 2) {
        changeScore(15);
      }
      setIndex(index + 1);
    }
    return;
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="overflow-hidden w-full h-screen bg-gray flex flex-col justify-between relative">
        <img
          src="../../public/Images/rewardbg.gif"
          className="absolute w-full h-full bg-contain top-0"
        />
        <Nav />
        <div className="w-[136px] h-[36px] absolute top-[110px] right-[350px]">
          <ScoreBox />
        </div>
        <div className="w-[304px] h-[78px] absolute top-[90px] right-[20px] flex justify-end items-center">
            <NextReward />
          
          
        </div>
        {/* <ScoreLevel end={end} start={start} /> */}

        {shiftBottom && (
          <>
            <TopText visibity={index === 1} />
            <TopPoints visibity={index === 2} />
            <TopCards visibity={index === 3} />
          </>
        )}

        <motion.div
          style={{ border: "none" }}
          initial={{ y:400,scale:0, border: "none" }}
          animate={{
            y: 480,
            scale:1,
            transition: { duration: 0.5 },
          }}
          variants={variants}
          className="w-[709px]  h-fit flex flex-col justify-between border-none mt-10 absolute right-0 left-0 ml-[auto] mr-[auto]"
        >
          <div className="w-full h-[244px]  border-none">
            <img
              src="../../public/Images/radio.svg"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
      <button style={{fontFamily:'Nuform Sans'}}
        className="w-44 h-20 text-[20px] text-gray bg-white absolute bottom-0"
        onClick={() => changeScore(10)}
      >
        vivk
      </button>
    </AnimatePresence>
  );
};

export default Index;
