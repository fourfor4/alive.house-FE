import { motion } from "framer-motion";

import "./index.scss";
import logo from "../../commonImg/logo.png";

const index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{ opacity: 0 }}
      className="mobileView_signedup_page"
    >
      <div className="logo_conatiner">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1>You are signed up!</h1>
      </div>
      <div className="text_container">
        <h1>Are you ready for a music experience like none other?</h1>
      </div>
    </motion.div>
  );
};

export default index;
