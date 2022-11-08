import React from "react";
import { motion } from "framer-motion";

import Marketplace from "./pages/Marketplace";
import AnimatePage from "../../../assets/comps/AnimateComponent";

const index = () => {
  return (
    <AnimatePage>
      <Marketplace />
    </AnimatePage>
  );
};

export default index;
