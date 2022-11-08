import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HashRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  changePage,
  changeSingupModalState,
  makeUserLogin,
  useChangeCurrentPage,
  useLoginUser,
  useShowLoader,
  useShowUnity,
  useSignupModal,
} from "../globalStates/Home";
import SongPage from "./Pages/SongPage/SongPage";
import Marketplace from "./Pages/MarketPlace/index";
import HomeScreen from "./Pages/HomeScreenPage/AliveHomePage";
// import ScrollToTop from "../assets/comps/ScrollToTop";
// import { useHookstate } from "@hookstate/core";
import HomePageAfterLogin from "./Pages/HomePageAfterLogin/HomePageAfterLogin";
import RewardPage from "../assets/RewardsPage";
import ConnectWallet from "./Pages/SignupPageOne";
import Unitybuild from "./Webgl/FlyingThrough";
import DeckOfCardsPage from "./Pages/DeckOfCardsPage/DeckOfCardsPage";
import { createState, useHookstate } from "@hookstate/core";
import LoginPage from "./Pages/LoginPage";
import useAuth from "../hooks/useAuth";
import ArtistPage from "./Pages/ArtistPage/ArtistPage";
import { useService } from "../hooks/useService";
import { useUserprofile } from "../hooks/user-profile";
import LoaderModal from "../Modals/Loader";
import WhitePaper from "./Pages/Whitepaper";
import useSongLaunch from "../hooks/use-song-launch";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import useMarketplace from "../hooks/use-marketplace";
import LegalPolicy from "./Pages/LegalPolicy/LegalPolicy";
import { useInputModal } from "../globalStates/ModalsState";
import LoginModal from "../Modals/LoginModal";
import InputModal from "../Modals/InputModal";
import Notfound from "./Pages/NotFoundPage/Notfound";
import Cookies from "./Pages/HomeScreenPage/components/Cookies";
import ErrorModal from "../Modals/ErrorModal";

AOS.init({
  duration: 1200,
  delay: 50,
});

const UnityData = createState({});

const AliveHomePage = () => {
  const auth = useAuth();
  const unityVisibilityState = useHookstate(useShowUnity());
  const localUnityData = useHookstate(UnityData);
  const loaderState = useHookstate(useShowLoader());
  const userLogin = useHookstate(useLoginUser());
  const service = useService();
  const userProfile = useUserprofile();
  const lauchSongData = useSongLaunch();
  const { isIPIndian } = useMarketplace();
  const marketplace = useMarketplace();
  const [showCookie, setShowCookie] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("accepted");
    if (accepted) {
      setShowCookie(false);
    }
    lauchSongData.fetchLatestLauch();
    if (auth.token()) {
      makeUserLogin();
    }
  }, []);

  useEffect(() => {
    userProfile.setToken(auth.token());
    if (userLogin?.value) {
      marketplace.state.isMagicLoggedIn.set(true);
    }
  }, [userLogin?.value]);

  useEffect(() => {
    if (loaderState?.value) {
      window.onscroll = function () {
        window.scrollTo(0, 0);
      };
    } else {
      window.onscroll = function () {};
    }
  }, [loaderState?.value]);

  return (
    <AnimatePresence exitBeforeEnter>
      <LoaderModal show={loaderState?.value} />
      <LoginModal show={useSignupModal().get()} />
      <InputModal show={useInputModal().get()} />

      <div>
        {/* {showScrollToTopButton.value && (
          <ScrollToTop jumpFunctionality={jumpToTop} />
        )} */}
        <div
          className="w-screen h-screen absolute top-0"
          style={{ zIndex: unityVisibilityState?.value ? 40 : -40 }}
        >
          <Unitybuild state={unityVisibilityState} data={localUnityData} />
        </div>
        <div
          className={"z-10"}
          style={{
            display: unityVisibilityState?.value ? "none" : null,
          }}
        >
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route
                path="/songpage"
                element={<SongPage data={localUnityData} />}
              ></Route>
              <Route path="/marketplace" element={<Marketplace />}></Route>
              <Route path="/signup" element={<ConnectWallet />}></Route>
              <Route path="/Home" element={<HomePageAfterLogin />}></Route>
              <Route path="/notfound" element={<Notfound />}></Route>
              <Route path="/customize" element={<DeckOfCardsPage />}></Route>
              <Route path="/artist" element={<ArtistPage />}></Route>
              <Route path="/whitepaper" element={<WhitePaper />}></Route>
              <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
              <Route path="/legalpolicy" element={<LegalPolicy />}></Route>
            </Routes>
            {/* {showCookie && <Cookies setShowCookie={setShowCookie} />} */}
          </HashRouter>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AliveHomePage;
