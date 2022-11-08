import React from "react";
import charac from "../../../../assets/SongHomePage/charplaceholder.png";
import bloomcard1 from "../../../../public/Images/bloom.png";
import lovecard1 from "../../../../public/Images/heartemoji.png";
import handstandcard1 from "../../../../public/Images/handstand.png";
import belaircard1 from "../../../../public/Images/belair.png";
import Flosscard1 from "../../../../public/Images/floss.png";
import MarketPlaceCard from "../../MarketPlace/components/MarketPlaceCard";
import closefield from "../../../../assets/SongHomePage/CloseField.svg";
import arrow from "../../../../assets/SongHomePage/arrow.png";
import pencil from "../../../../assets/SongHomePage/pencil.svg";
import { StatsCard, StatsCardAdd } from "./StatsCard";
import {
  setShowPopup,
  useShowPopUp,
  useUserDetails,
} from "../../../../globalStates/Home";
import { useHookstate } from "@hookstate/core";
import { changeEndScore } from "../../../../globalStates/Score";
import { useEffect } from "react";
import { useState } from "react";
import NextReward from "../../../../assets/comps/NextReward";
import ScoreBox from "../../../../assets/comps/ScoreBox";
import Popup from "../../../../assets/comps/Popup/Popup";
import RPM from "../../../../assets/comps/RPM/RPM";
import { AnimatePresence } from "framer-motion";
import FixedArtifacts from "../../../../artifacts/AliveFixedUpgradeable.json";
import BondedArtifacts from "../../../../artifacts/AliveBondedUpgradeable.json";
import AuctionArtifacts from "../../../../artifacts/AliveDutchUpgradeable.json";
import { useNavigate } from "react-router-dom";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import { useUserprofile } from "../../../../hooks/user-profile";
import { setErrorMessage } from "../../../../hooks/useErrors";
import ErrorModal from "../../../../Modals/ErrorModal";
import { Element } from "react-scroll";
import useAuth from "../../../../hooks/useAuth";
import useSongDetais from "../../../../hooks/useSongDetais";
import { ethers } from "ethers";
import CollectionCard from "../../../../assets/comps/CollectionCard/Collectioncard";
import { useRef } from "react";

const Character = () => {
  const detailsState = useHookstate(useUserDetails());
  const [edit, setEdit] = useState(false);
  const [userNameText, setUserNameText] = useState("");
  const { value, patchMe, setToken } = useUserprofile();
  const [collections, setCollections] = useState([]);
  const [loader, setLoader] = useState(true);
  const inputRef = useRef();
  const dummyEdition = [
    {
      id: 1,
      type: "FIXED",
      contractAddress: "0xc175c2242945fc26eff1678e5222ccffe8826768",
      name: "Stem Player",
    },
    {
      id: 2,
      type: "FIXED",
      contractAddress: "0xc3fd55084C81f9dA6faF06c5Fc1e0bD354321753",
      name: "Song evolution bundle",
    },
  ];
  // const { editions, fetchSongDetails, localCopy } = useSongDetais();
  const auth = useAuth();
  const navigate = useNavigate();
  const { _t } = useAnalytics();

  useEffect(() => {
    setToken(auth.token());
  }, []);

  useEffect(() => {
    if (edit) {
      inputRef.current.select();
    }
  }, [edit]);

  useEffect(() => {
    if (value?.data?.publicAddress?.value) {
      getBalance(value?.data?.publicAddress?.value);
    }
  }, [value?.data?.publicAddress?.value]);

  const getAbi = (tier) => {
    let abi;
    switch (tier.type) {
      case "FIXED":
        abi = FixedArtifacts.abi;
        break;
      case "BONDED":
        abi = BondedArtifacts.abi;
        break;
      case "AUCTION":
        abi = AuctionArtifacts.abi;
        break;
      default:
        break;
    }
    console.log("getABI");
    return abi;
  };

  const SONG = (tier) => {
    // if (SONG_REF.current) return SONG_REF.current;
    // console.log({ CA: tier.contractAddress });
    // const ContractAddress = "0xCb3Cfa40B4deC8de9Dfea412669768e88c2D2A74";
    const providerUrl = import.meta.env.VITE_PUBLIC_ALCHEMY_PROVIDER;
    // ("https://polygon-mumbai.g.alchemy.com/v2/kV8qIfhZYAYxIzeQrxfHrso9_R-ITP4y"); //ToDO: move to env
    const ContractAddress = tier.contractAddress;
    // console.log({ ContractAddress });
    // let provider = new ethers.providers.Web3Provider(window.ethereum);
    let provider = new ethers.providers.JsonRpcProvider(providerUrl);
    // const signer = provider.getSigner();
    // console.log({ provider });
    try {
      let a = new ethers.Contract(ContractAddress, getAbi(tier), provider);
      // console.log({ auc }, ContractAddress, provider, providerUrl);
      return a;
    } catch (error) {
      // console.log({ tier, ContractAddress, abi: getAbi(), provider });
      console.log("abi error");
    }

    // return SONG_REF.current;
  };

  const getBalance = async (fromAddress) => {
    try {
      let coll = [];
      dummyEdition.map(async (edition) => {
        let b = await SONG(edition).balanceOf(fromAddress);

        Array(Number(b))
          .fill()
          .map((num, index) => {
            coll.push(edition);
          });
      });
      setCollections(coll);
    } catch (err) {
      console.log({ err });
    }
    setTimeout(() => {
      setLoader(false);
    }, 15000);
  };

  // useEffect(() => {
  //   console.log({ collections });
  // }, [collections]);

  const gotoDeckofCard = () => {
    _t("SUCCESS:DECKOFCARD:PAGE");
    navigate("/customize");
  };

  const getName = (email) => {
    let name = email?.split("@")[0];
    if (!name) {
      return;
    }
    if (name.length <= 10) {
      return name;
    } else {
      return name.slice(0, 10) + "...";
    }
  };

  const close = () => {
    setShowPopup(false);
  };

  const submitChanges = async () => {
    setEdit(false);
    if (value?.data?.publicAddress?.value && userNameText) {
      const res = await patchMe({ data: { username: userNameText } });
      return;
    } else {
      setErrorMessage({
        title: "Something went wrong",
        message: "PLease try again later",
      });
      return;
    }
  };

  return (
    <>
      <div>
        <div className="min-h-[100vh] min-w-[100vw] bg-gray mt-[4.6rem] relative flex items-center">
          <AnimatePresence exitBeforeEnter>
            {useShowPopUp().get() && (
              <Popup close={close}>
                <RPM />
              </Popup>
            )}
          </AnimatePresence>

          <div
            className="flex flex-col relative items-center justify-center"
            style={{ visibility: useShowPopUp().get() ? "hidden" : null }}
          >
            <div className=" border border-yellow w-[530px] h-[530px] ml-[6rem] z-[4] relative">
              <img
                src={detailsState?.avatar?.value || charac}
                className="w-full h-full object-contain"
                alt="charac"
              />
            </div>

            <button className="flex absolute top-[3rem] left-[10rem] z-[5] h-[6rem]">
              <div
                onClick={() => setShowPopup(true)}
                style={{
                  fontFamily: "Nuform Sans",
                  fontWeight: "900",
                }}
                className="w-[13rem] text-[18px] border-y border-r border-gray  text-gray bg-yellow h-[4rem] flex items-center justify-center"
              >
                edit character
              </div>
            </button>
          </div>
          <div className="w-[90vw]">
            <div className="ml-[-3rem]">
              <div className="flex items-center justify-around  gap-[2rem] ">
                <div className="flex justify-center items-center gap-[5rem]">
                  <div
                    style={{ fontFamily: "Nuform Sans" }}
                    className="text-[32px] text-white"
                  >
                    hello{" "}
                    <span
                      style={{ fontFamily: "Nuform Sans" }}
                      className="text-green"
                    >
                      {!edit &&
                        getName(userNameText || value?.data?.username?.value)}
                    </span>
                    {/* {edit && (
                    <input
                      value={value?.data?.email?.value}
                      onChange={(e) => setUserNameText(e.target.value)}
                      onSubmit={handleSubmit}
                      className="bg-gray w-[18rem]"
                    />
                  )} */}
                    {edit && (
                      <input
                        defaultValue={value?.data?.username?.value}
                        ref={inputRef}
                        onChange={(e) => setUserNameText(e.target.value)}
                        className="bg-gray text-green w-[18rem]"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            submitChanges();
                          }
                        }}
                      />
                    )}
                  </div>
                  <img
                    src={edit ? closefield : pencil}
                    onClick={() => setEdit(!edit)}
                    alt="pencil"
                    className={edit ? "w-[2.5rem]" : ""}
                    style={{ cursor: "pointer" }}
                  />
                  {edit && (
                    <button
                      className="bg-white text-[20px] h-[4rem] w-[8rem] text-gray cursor-pointer"
                      onClick={submitChanges}
                    >
                      <p
                        style={{ fontFamily: "Nuform Sans" }}
                        className="mt-[-3px]"
                      >
                        save
                      </p>
                    </button>
                  )}
                </div>
                <div className="w-[136px] h-[36px]">
                  <ScoreBox />
                </div>
              </div>
              <div className="">
                <div className=" flex items-center h-[70vh] justify-center">
                  <div className="flex flex-col mt-[2rem] items-start h-[63vh] justify-between gap-[4rem]">
                    <div
                      style={{ fontFamily: "Nuform Sans" }}
                      className="w-[45vw] pl-4 py-7"
                    >
                      <p className="text-white text-[22px]">
                        thank you for joining a.live!
                      </p>
                      <br />
                      <p className="text-white text-[22px]">
                        as a welcome, here is your initial deck of 5 interaction
                        cards
                      </p>
                      <br />
                      <p className="text-white text-[22px]">
                        collect cassettes as you fly through our worlds to get
                        more- card customization is coming soon!
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p
                        style={{ fontFamily: "Nuform Sans" }}
                        className="text-white text-[24px]"
                      >
                        my deck
                      </p>
                      <div className="flex gap-[4rem] ml-[-1rem] mt-[2rem]">
                        <div className="bg-cover w-[11rem] flex items-center border border-white">
                          <img
                            src={bloomcard1}
                            className="w-[11rem]"
                            alt="effect card"
                          />
                        </div>
                        <div className="bg-cover w-[11rem] flex items-center border border-white">
                          <img
                            src={lovecard1}
                            className="w-[11rem]"
                            alt="effect card"
                          />
                        </div>
                        <div className="bg-cover w-[11rem] flex items-center border border-white">
                          <img
                            src={handstandcard1}
                            className="w-[11rem] scale-[1.2]"
                            alt="effect card"
                          />
                        </div>
                        <div className="bg-cover w-[11rem] flex items-center border border-white">
                          <img
                            src={belaircard1}
                            className="w-[11rem]"
                            alt="effect card"
                          />
                        </div>
                        <div className="relative bg-cover w-[11rem] flex items-center border border-white">
                          <img
                            src={Flosscard1}
                            className="w-[11rem] scale-[1.05] absolute bottom-[0] right-[-3px]"
                            alt="effect card"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Element
          name="mycollections"
          className="max-h-[100vh] bg-gray pb-[4rem]  pt-[4rem]"
        >
          <div className=" h-[100vh] flex flex-col justify-around items-center">
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-white text-[84px] "
            >
              my collection
            </p>
            {/* <div className="flex items-center justify-center my-[3rem] gap-[7rem]">
              <p
                style={{ fontFamily: "Nuform Sans" }}
                className="text-white text-[24px]"
              >
                this is lonely, start your collection now!
              </p>
            </div> */}
            <div className="h-fit w-full flex items-center justify-center">
              {collections?.map((collection, index) => (
                <CollectionCard
                  key={index}
                  data={collection}
                  status={"i"}
                  // func={goToSongPage}
                />
              ))}
              {loader && !collections.length && (
                <button
                  disabled
                  type="button"
                  class="text-yellow  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-3xl px-5 py-5 text-center mr-2 dark:bg-blue-600 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg
                    role="status"
                    class="inline mr-5 w-12 h-12 text-yellow animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="black"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  fetching collection...
                </button>
              )}
              {!loader && !collections.length && (
                <p
                  style={{ fontFamily: "Nuform Sans" }}
                  className="text-white text-[24px]"
                >
                  this is lonely, start your collection now!
                </p>
              )}
            </div>

            {/* <MarketPlaceCard
              data={""}
              status={"i"}
              // func={goToSongPage}
            /> */}
            <div>
              <div
                style={{ fontFamily: "Nuform Sans" }}
                className="text-[16px] text-white flex justify-center mt-8 mb-5 pb-[2rem] items-center gap-2"
              >
                see more
                <img src={arrow} className="h-[2.5rem]" />
              </div>
            </div>
          </div>
        </Element>
      </div>
    </>
  );
};

export default Character;
