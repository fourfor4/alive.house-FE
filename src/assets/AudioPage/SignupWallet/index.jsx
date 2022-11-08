import "./index.scss";
import { motion } from "framer-motion";
import Fox from "./Images/fox.png";
import Blue from "./Images/blue.png";
import backArrow from "./Images/arrowBackward.svg";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../redux/actions/AudioPage";

const index = () => {
  return (
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1) " }}
      exit={{ transform: "scale(0)" }}
      className="signup_wallet_container"
    >
      <ConnectWallet />
    </motion.div>
  );
};

export default index;

{
  /* <div className="signup_wallet_container_box">
        <div
          className="wallet_signup_back_option"
          onClick={() => dispatch(nextStep("signup"))}
        >
          <div className="wallet_signup_back_option_img">
            <img src={backArrow} alt="back-arrow" />
          </div>
          <span>back</span>
        </div>
        <h1>sign up with wallet</h1>
        <div
          className="wallet_signup_option one"
          onClick={() => dispatch(nextStep("finalPage"))}
        >
          <div className="wallet_signup_option_img">
            <img src={Fox} alt="fox" />
          </div>
          <div className="wallet_signup_option_info">
            <h2>MetaMask</h2>
            <h3>using a browser extension</h3>
          </div>
        </div>
      </div> */
}
