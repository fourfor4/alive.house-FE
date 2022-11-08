import { motion } from "framer-motion";
import { memo } from "react";

const TopPoints = ({ visibity }) => {
  return visibity ? (
    <motion.div
      initial={{
        y: 300,
        scale:0,
        rotate:0,
      }}
      animate={{
        y: -100,
        scale:1,
        rotate:-10,
        transition: { duration: 0.8 },
      }}
      className="min-w-full h-full grid place-items-center"
    >
      <div className="w-full h-fit  border-none grid place-content-center absolute right-0 left-0 ml-[auto] mr-[auto]">
        <div className="w-[271px] h-[118px] relative">
          <img
            src="../../public/Images/points.svg"
            alt="points"
            className="w-full h-full object-contain"
          />
          <div className="w-[87px] h-[87px]  absolute -top-[30px] -right-[30px]">
            <img
              src="../../public/Images/yellowStar.svg"
              alt="points"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </motion.div>
  ) : null;
};
export default memo(TopPoints);
