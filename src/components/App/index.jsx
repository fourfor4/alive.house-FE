import { AnimatePresence, motion } from "framer-motion";

import { isMobile } from "react-device-detect";
import RewardPage from "../../assets/RewardsPage";

import "./index.scss";

import RestrictMobileView from "../Pages/RestrictMobile";
import AliveHomePage from "../index";

function App() {
  if (isMobile) {
    return <RestrictMobileView />;
  }
  return (
    <>
      <AliveHomePage />
    </>
    // <RewardPage />
  );
}

export default App;
