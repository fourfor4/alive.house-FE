import React, { memo, useMemo, useState } from "react";
import masterlogo from "../../../../public/Images/betalogo.png";
import search from "../../../../assets/SongHomePage/Search_Stroke.svg";
import close from "../../../../assets/SongHomePage/Close_Stroke.svg";
import pencil from "../../../../assets/SongHomePage/pencil.svg";

import {
  changePage,
  changeSingupModalState,
  makeUserLogin,
  makeUserLogout,
  useLoginUser,
} from "../../../../globalStates/Home/index";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import useAuth from "../../../../hooks/useAuth";
import useRouter from "../../../../hooks/useRouter";
import Scroll from "react-scroll";
import { useUserprofile } from "../../../../hooks/user-profile";

const Nav = () => {
  var scroller = Scroll.scroller;
  const [searchOpen, setSearchOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const [showDrop, setShowDrop] = useState(false);
  const { _t } = useAnalytics();
  const { value } = useUserprofile();
  const nameShortner = useMemo(() => {
    if (value?.data?.username?.value?.length > 9) {
      return value?.data?.username?.value?.substring(0, 9) + "...";
    } else {
      return value?.data?.username?.value;
    }
  }, [value?.data?.username?.value]);

  //temperary username
  const [username, setUsername] = useState("cyborg123456789");
  const [inputVisible, setInputVisible] = useState(false);
  let shortenUser =
    value?.data?.username?.value?.length > 9 &&
    value?.data?.username?.value?.substring(0, 9) + "...";

  let mouseTimeout;

  const handleSignMouseEnter = () => {
    clearTimeout(mouseTimeout);
    setShowDrop(true);
  };

  const handleSignMouseLeave = () => {
    mouseTimeout = setTimeout(() => {
      setShowDrop(false);
    }, 300);
  };

  const handleDropMouseEnter = () => {
    clearTimeout(mouseTimeout);
    setShowDrop(true);
  };

  const signInAsArtist = () => {
    _t("SUCCESS:FOR ARTISTS:CLICKED");
    window.open(`${import.meta.env.VITE_ARTIST_URL}`);
  };

  const handleListenerLogin = () => {
    _t("SUCCESS:FOR LISTENER:CLICKED");
    changeSingupModalState(true);
  };

  const handleLogout = () => {
    auth.removeToken();
    router.push("/");
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setTimeout(() => {
      setVisible(true);
    }, 300);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setVisible(false);
  };

  const handleScroll = () => {
    router.push("/Home");
    setTimeout(() => {
      scroller.scrollTo("mycollections", {
        duration: 1000,
        delay: 0,
        smooth: true,
      });
    }, 500);
  };

  return (
    <div className="h-[80px] bg-white flex items-center justify-between border border-black z-10">
      <img
        src={masterlogo}
        className="h-[55px] m-[30px] z-40 cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="font-bold" style={{ fontFamily: "Nuform Sans" }}>
        <div className="flex items-center">
          {!searchOpen && (
            <div className="flex gap-6  text-base border-l border-black p-[32px]">
              <button
                className="text-[16px] text-gray mr-5"
                onClick={signInAsArtist}
              >
                for artists
              </button>
              <button
                className="text-[16px] text-gray  mr-5"
                onClick={() => router.push("/marketplace")}
              >
                marketplace
              </button>

              <a
                style={{ fontFamily: "Nuform Sans" }}
                className="text-[16px] text-gray  mr-5"
                href="https://alivemusic.zendesk.com/hc/en-us"
                target="_blank"
              >
                faqs
              </a>
              <button
                className="text-[16px] text-gray  mr-5"
                onClick={() => router.push("/whitepaper")}
              >
                whitepaper
              </button>
            </div>
          )}
          <div
            className={`p-[22px] ${
              searchOpen ? "w-[40rem] flex items-center gap-[2rem]" : "w-[8rem]"
            } transition-all duration-300 border-x border-black `}
          >
            <img onClick={handleSearchOpen} src={search} />
            {visible && (
              <div className="flex items-center ">
                <input
                  placeholder="search" style={{fontFamily: "Nuform Sans"}}
                  className="bg-white border-b border-[#24243040] w-[28rem] placeholder-[#24243040] text-[#24243040] text-[14px]"
                />
                <div className="w-[28px] h-[28px]">
                  <img
                    onClick={handleSearchClose}
                    src={close}
                    className="w-[2rem] object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          {useLoginUser().get() ? (
            <div>
              <button
                onClick={handleLogout}
                onMouseEnter={handleSignMouseEnter}
                onMouseLeave={handleSignMouseLeave}
                className={`m-[30px] hover:bg-gray hover:text-white relative transition-all duration-500 text-[16px] mr-[90px] border border-black ${
                  showDrop ? "bg-gray text-white" : "bg-yellow"
                } pt-[8px] pb-[8px] px-[24px] flex items-center justify-center`}
              >
                my profile
              </button>
              <div
                onMouseEnter={handleDropMouseEnter}
                onMouseLeave={() => setShowDrop(false)}
                className={`z-[300] absolute ${
                  showDrop ? "flex" : "hidden"
                } sizeanimation flex-col w-[18rem] h-[15rem] right-[9rem] border border-gray top-[6.8rem] bg-white`}
              >
                <div className="h-1/2 w-[18rem] opacityanimation gap-[10px] text-[20px] text-gray bg-green border-b border-r border-gray text-[left] flex justify-start items-center">
                  {!inputVisible && (
                    <span
                      style={{ fontFamily: "Nuform Sans" }}
                      className="ml-[3rem]"
                    >
                      {nameShortner}
                    </span>
                  )}
                </div>
                <p
                  onClick={handleScroll}
                  className="h-1/2 w-[18rem] opacityanimation text-[16px] text=gray hover:bg-gray hover:text-white text-[left] flex justify-start items-center"
                >
                  <span
                    style={{ fontFamily: "Nuform Sans" }}
                    className="ml-[3rem]"
                  >
                    my collection
                  </span>
                </p>
                <button
                  onClick={handleLogout}
                  className="h-1/2 w-[18rem] opacityanimation text-[16px] text=gray hover:bg-gray hover:text-white text-[left] flex justify-start items-center"
                >
                  <span
                    style={{ fontFamily: "Nuform Sans" }}
                    className="ml-[3rem]"
                  >
                    logout
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onMouseEnter={handleSignMouseEnter}
                onMouseLeave={handleSignMouseLeave}
                className={`m-[30px] relative transition-all duration-500 text-[16px] mr-[90px] border border-black ${
                  showDrop ? "bg-green" : "bg-yellow"
                } pt-[8px] pb-[8px] px-[24px] flex items-center justify-center`}
              >
                <p style={{fontFamily:'Nuform Sans'}} className='mt-[-2px]'>sign in</p>
              </button>
              <div
                onMouseEnter={handleDropMouseEnter}
                onMouseLeave={() => setShowDrop(false)}
                className={`z-[300] absolute ${
                  showDrop ? "flex" : "hidden"
                } sizeanimation flex-col w-[18rem] h-[10rem] right-[9rem] border border-gray top-[6.8rem] bg-white`}
              >
                <button
                  className="h-1/2 w-[18rem] opacityanimation text-[16px] text=gray hover:bg-gray hover:text-white text-[left] flex justify-start items-center"
                  onClick={handleListenerLogin}
                >
                  <span className="ml-[3rem]">for listeners</span>
                </button>
                <button
                  onClick={signInAsArtist}
                  className="h-1/2 w-[18rem] opacityanimation text-[16px] text=gray hover:bg-gray hover:text-white text-[left] flex justify-start items-center"
                >
                  <span className="ml-[3rem]">for artists</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Nav);
