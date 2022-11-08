import { useHookstate } from "@hookstate/core";
import { ethers } from "ethers";
import moment from "moment";
import React, { useRef, useState } from "react";
import { memo } from "react";
import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import {
  changeSingupModalState,
  chnageButtonAction,
  setPaymentState,
  useLoginUser,
} from "../../../../globalStates/Home";
import useMarketplace from "../../../../hooks/use-marketplace";
import { data } from "./data";
import HomePageToolTip from "./ToolTip/HomePageToolTip";
import FixedArtifacts from "../../../../artifacts/AliveFixedUpgradeable.json";
import BondedArtifacts from "../../../../artifacts/AliveBondedUpgradeable.json";
import AuctionArtifacts from "../../../../artifacts/AliveDutchUpgradeable.json";
import camera from "../../../../assets/SongHomePage/icons/Camera_Boxed.svg";
import cd from "../../../../assets/SongHomePage/icons/CD_Boxed.svg";
import lyrics from "../../../../assets/SongHomePage/icons/Lyrics_Boxed.svg";
import star from "../../../../assets/SongHomePage/icons/Star_Boxed.svg";
import stem from "../../../../assets/SongHomePage/icons/StemPlayer_Boxed.svg";
import bts from "../../../../assets/SongHomePage/icons/BTS_Boxed.svg";
import { useExchange } from "../../../../hooks/use-exchange";
import { useMemo } from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import LaunchTimer from "../../../../assets/comps/LaunchTimer";
import useSongLaunch from "../../../../hooks/use-song-launch";
import { changeInputModalState } from "../../../../globalStates/ModalsState";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import { useUserprofile } from "../../../../hooks/user-profile";
import Toggle from "../../../../assets/comps/Toggle/Toggle";
import { setErrorMessage } from "../../../../hooks/useErrors";

const GenerateFilters = ({ data, localData }) => {
  return (
    <Tooltip
      placement="right"
      mouseLeaveDelay={0}
      overlay={
        <HomePageToolTip
          title={data.contentType}
          source={localData[data?.contentType]}
          data={data?.title}
        />
      }
    >
      <div className="flex items-center gap-[2rem] text-[22px] text-gray">
        <img src={localData[data?.contentType]} />
        <span style={{ fontFamily: "Nuform Sans" }}>{data.contentType}</span>
      </div>
    </Tooltip>
  );
};

const EditionData = ({ isVisibility, tier, setPaymentTier }) => {
  const { _t } = useAnalytics();
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [priceIncPerSale, setPriceIncPerSale] = useState(0);
  const [balance, setBalance] = useState(null);
  const [price, setPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [buyNowVisibility, setBuyNowVisibility] = useState(false);
  const [auctionFloorPrice, setAuctionFloorPrice] = useState(null);
  const [auctionStartDate, setAuctionStartDate] = useState(null);
  const [auctionDuration, setAuctionDuration] = useState(null);
  const [buttonTitle, setButtonTitle] = useState("buy now");
  const [openSeaLink, setOpenSeaLink] = useState("");
  const [tick, setTick] = useState(0);
  const SONG_REF = useState(null);
  const SONG_MINT_REF = useRef(null);
  const timerRef = useRef(null);
  const marketplace = useMarketplace();
  const { exchangeRates } = useExchange();
  const { launchDataCopy } = useSongLaunch();
  const loggedIn = useHookstate(useLoginUser());
  const { value } = useUserprofile();
  const [asNativeCurrency, setAsNativeCurrency] = useState(true);
  const [isIndian, setIsIndian] = useState(null);

  const bonusSelectedItems = {
    stems: `${stem}`,
    demo: `${cd}`,
    "live footage": `${star}`,
    "behind the scenes": `${bts}`,
    other: `${camera}`,
    lyrics: `${lyrics}`,
  };

  const checkIP = async () => {
    try {
      const res = await marketplace.isIPIndian();
      setIsIndian(res);
    } catch (err) {
      setErrorMessage({
        title: "Something went wrong",
        message: "Failed to fetch IP",
      });
      return;
    }
  };

  const fiatPrices = useMemo(() => {
    return exchangeRates(Number(displayPrice));
  }, [displayPrice]);

  useEffect(() => {
    checkIP();
    timerRef.current = setInterval(() => {
      setTick((t) => t + 1);
    }, 30000);

    return () => clearInterval(timerRef.current);
  }, []);

  const getAbi = () => {
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
    return abi;
  };

  const SONG_MINT = () => {
    if (SONG_MINT_REF.current) return SONG_MINT_REF.current;

    const ContractAddress = tier.contractAddress;
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // let provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const signer = provider.getSigner();

    SONG_MINT_REF.current = new ethers.Contract(
      ContractAddress,
      getAbi(),
      signer
    );
    return SONG_MINT_REF.current;
  };

  const SONG = () => {
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
      let a = new ethers.Contract(ContractAddress, getAbi(), provider);
      // console.log({ auc }, ContractAddress, provider, providerUrl);
      return a;
    } catch (error) {
      // console.log({ tier, ContractAddress, abi: getAbi(), provider });
      console.log("abi error");
    }

    // return SONG_REF.current;
  };

  useEffect(() => {
    // if (!(window.ethereum && userAddress)) {
    //   return;
    // }
    const refreshData = async () => {
      if (tier.type === "AUCTION") {
        let tS,
          mS,
          aCP,
          aFP,
          discountRate,
          startAtUTC,
          startAt,
          p,
          isStartDateFuture;
        try {
          tS = Number(await SONG().totalSupply());
          // console.log("auction", { tS });
          mS = Number(await SONG().maxMintAmount());
          // console.log("auction", { mS });
          aCP = ethers.utils.formatEther(await SONG().ceilPrice());
          // console.log("auction", { aCP });
          aFP = ethers.utils.formatEther(await SONG().floorPrice());
          // console.log("auction", { aFP });
          discountRate = await SONG().discountRate();
          // console.log("auction", { discountRate });
          startAtUTC = Number(await SONG().startedAt()) * 1000;
          // console.log("auction", { startAtUTC });

          isStartDateFuture = startAtUTC > Date.now();
          // console.log({ isStartDateFuture });
          // isStartDateFuture = true;
          startAt = new Date(startAtUTC);
          // console.log({ startAt });
          try {
            p = isStartDateFuture ? 0 : await SONG().getPrice(1);
            // console.log("getting price....auc", ethers.utils.formatEther(p));
          } catch (error) {
            // console.log("Failed at price", error);
          }

          // console.log({ p });
        } catch (error) {
          // console.log({ auctionError: error });
          console.log({ error });
        }

        try {
          const fromAddress = value?.data?.publicAddress?.value;

          let b = await SONG().balanceOf(fromAddress);
          setBalance(Number(b));
          // console.log("balance  auction", { b });
        } catch (err) {}

        // setAuctionDuration(dur);
        setAuctionFloorPrice(aFP);
        startAt && setAuctionStartDate(startAt.toString());
        setMaxSupply(mS);
        setTotalSupply(tS);
        setPrice(p);
        !isStartDateFuture && p && setDisplayPrice(ethers.utils.formatEther(p));
        if (isStartDateFuture) {
          setButtonTitle("not started");
        } else {
          setButtonTitle(tS < mS ? "Buy" : "sold out");
        }
        // console.log("auc end");
      } else if (tier.type === "BONDED") {
        let mS = Number(await SONG()?.maxMintAmount());
        // console.log({ mS });
        let tS = Number(await SONG().totalSupply());
        // console.log({ tS });
        let p = await SONG().currentPrice();
        // console.log("getting price.... bond", p);
        let pIncreasePerSale = ethers.utils.formatEther(
          await SONG().upcountRate()
        );
        try {
          const fromAddress = value?.data?.publicAddress?.value;
          let b = await SONG().balanceOf(fromAddress);
          console.log({ b });
          setBalance(Number(b));
        } catch (err) {}
        setPriceIncPerSale(pIncreasePerSale);
        setMaxSupply(mS);
        setTotalSupply(tS);
        setPrice(p);
        setDisplayPrice(ethers.utils.formatEther(p));
        setButtonTitle(tS < mS ? "Buy" : "sold out");
        // console.log("bond end");
      } else if (tier.type === "FIXED") {
        let mS = Number(await SONG().maxMintAmount());

        let tS = Number(await SONG().totalSupply());
        // console.log("initialPrice... ");
        let p = await SONG().initialPrice();
        // console.log("fixedMintPrice... ", p);

        // console.log("step 1");
        try {
          const fromAddress = value?.data?.publicAddress?.value;
          let b = await SONG().balanceOf(fromAddress);

          // console.log("step 3", b);
          setBalance(Number(b));
        } catch (err) {}
        // marketplace.getSigner();
        // console.log("step 4", balance);

        setMaxSupply(mS);

        setTotalSupply(tS);
        setPrice(p);
        setDisplayPrice(ethers.utils.formatEther(p));
        setButtonTitle(tS < mS ? "Buy" : "sold out");
        // console.log("fix end");
      }
    };
    refreshData();
  }, [tick]);

  useEffect(() => {
    if (buyNowVisibility) {
      chnageButtonAction("regular");
    }
  }, [buyNowVisibility]);

  const buyClicked = (tier) => {
    tier.displayPrice = displayPrice;
    tier.price = price;
    tier.fiatPrices = fiatPrices;

    marketplace.state.selectedTier.set(JSON.parse(JSON.stringify(tier)));
    setPaymentTier(tier);
    if (!loggedIn?.value) {
      setPaymentState(true);
      changeSingupModalState(true);
      return;
    }
    _t("SUCCESS:BUYNOW:CLICKED");
    marketplace.state.showPaymentsPopup.set(true);
    return;
  };

  return isVisibility ? (
    <>
      <div className="flex text-gray justify-center gap-[15rem] mt-[3rem]">
        <div>
          <p style={{ fontFamily: "Nuform Sans" }} className="text-[32px]">
            available
          </p>
          <p
            style={{ fontFamily: "Nuform Sans" }}
            className="text-[#FF665C] text-[68px] mt-[-1rem]"
          >
            {maxSupply - totalSupply || 0}/{maxSupply || 0}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "Nuform Sans" }} className="text-[32px]">
            price ({asNativeCurrency ? (isIndian ? "inr" : "usd") : "matic"})
          </p>
          {asNativeCurrency ? (
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[#FF665C] text-[68px] mt-[-1rem]"
            >
              {isIndian
                ? fiatPrices?.inr
                  ? fiatPrices?.inr
                  : "loading.."
                : fiatPrices?.usd
                ? fiatPrices?.usd
                : "loading.."}
            </p>
          ) : (
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[#FF665C] text-[68px] mt-[-1rem]"
            >
              {displayPrice ? parseFloat(displayPrice).toFixed(2) : "loading.."}
            </p>
          )}
        </div>
        <div className="w-[100px] h-[30px] absolute right-56 translate-y-5">
          <Toggle
            state={asNativeCurrency}
            setAsNativeCurrency={setAsNativeCurrency}
            isIndian={isIndian}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid overflow-hidden grid-cols-3 grid-rows-2  gap-[2rem] justify-start mx-[8rem] mt-[3rem]">
          {tier?.selectedBonus?.map((bonus, index) => (
            <GenerateFilters
              key={index}
              data={bonus}
              localData={bonusSelectedItems}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-[5rem] mb-[5rem]">
        {maxSupply - totalSupply ? (
          <button
            // disabled={!buyNowVisibility}
            onClick={() => buyClicked(tier)}
            style={{
              fontFamily: "Nuform Sans",
              // cursor: buyNowVisibility ? "" : "not-allowed",
            }}
            className={`h-[64px] border border-black w-[280px] text-gray text-[30px] bg-yellow mb-10`}
          >
            buy now
          </button>
        ) : (
          <button
            // disabled={!buyNowVisibility}

            style={{
              fontFamily: "Nuform Sans",
              // cursor: buyNowVisibility ? "" : "not-allowed",
            }}
            className={`h-[64px] border border-black w-[280px] text-gray text-[30px] bg-yellow mb-10`}
          >
            sold out
          </button>
        )}
        {/* <LaunchTimer
          launchTime={launchDataCopy?.[0]?.launchTime?.value}
          extraSecs={332}
          setBuyNowVisibility={setBuyNowVisibility}
        /> */}
        <h1 className="text-3xl ">{balance || 0} edition owned</h1>
      </div>
    </>
  ) : null;
};

export default memo(EditionData);
{
  {
    /* <button
          disabled={!buyNowVisibility}
          onClick={() => buyClicked(tier)}
          style={{
            fontFamily: "Nuform Sans",
            cursor: buyNowVisibility ? "" : "not-allowed",
          }}
          className={`h-[64px] border border-black w-[280px] text-gray text-[30px] bg-yellow mb-10`}
        >
          buy now
        </button>
        
        <button
          disabled={!buyNowVisibility}
          onClick={() => buyClicked(tier)}
          style={{
            fontFamily: "Nuform Sans",
            cursor: buyNowVisibility ? "" : "not-allowed",
          }}
          className={`h-[64px] border border-black w-[280px] text-gray text-[30px] bg-yellow mb-10 ${
            buyNowVisibility ? "" : "cursor-not-allowed opacity-50"
          }`}
        >
          buy now
        </button>
        
        
        
        */
  }
}
