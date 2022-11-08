import { motion } from "framer-motion";
import ResponsiveCarousel from "../../components/Pages/HomePageAfterLogin/components/Carousel";

const TopCards = ({ visibity }) => {
  return visibity ? (
    <motion.div
      initial={{
        y: 300,
        scale:0,
      }}
      animate={{
        y: -125,
        scale:1,

        transition: { duration: 1 },
      }}
      className="min-w-full h-full grid place-items-center"
    >
      <div className="w-fit h-fit scale-[0.8] grid place-items-center relative mt-16">
        <ResponsiveCarousel buttonsVisibility={false} />
      </div>
    </motion.div>
  ) : null;
};

export default TopCards;
