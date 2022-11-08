import { motion } from "framer-motion";
import { memo } from "react";

const TopText = ({ visibity }) => {
  return visibity ? (
    <motion.div
      initial={{
        y: 300,
        scale:0,
        rotate:0,
      }}
      animate={{
        y: -100,
        scale:1.5,
        // rotate:-10,

        transition: { duration: 0.8 },
      }}
      className="min-w-full h-full grid place-items-center"
    >
      <div className="w-full h-fit  border-none flex justify-center items-end absolute right-0 left-0 ml-[auto] mr-[auto]">
        <h1 className="text-white text-[80px] font-extrabold">
          you rock bruv!
        </h1>
      </div>
    </motion.div>
  ) : null;
};

export default memo(TopText);
