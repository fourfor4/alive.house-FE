import { createState, useHookstate } from "@hookstate/core";
import { BigNumber, ethers } from "ethers";
import { AnimatePresence } from "framer-motion";
import React, { memo, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useEffect } from "react";
import Popup from "../../../../assets/comps/Popup/Popup";
import {
  setshowLoader,
  setShowPopup,
  useLoginUser,
  useShowPopUp,
  useUserDetails,
  useUserEmail,
} from "../../../../globalStates/Home";
import useMarketplace from "../../../../hooks/use-marketplace";
import { setErrorMessage, setInfoMessage } from "../../../../hooks/useErrors";
import PaymentModal from "../../../../Modals/PaymentModal";
import EditionData from "./EditionData";
import ExchangeArtifacts from "../../../../artifacts/AliveExchange.json";
import FixedArtifacts from "../../../../artifacts/AliveFixedUpgradeable.json";
import BondedArtifacts from "../../../../artifacts/AliveBondedUpgradeable.json";
import AuctionArtifacts from "../../../../artifacts/AliveDutchUpgradeable.json";
import OnmetaModal from "../../../../Modals/OnmetaModal";
import ErrorModal from "../../../../Modals/ErrorModal";
import InfoModal from "../../../../Modals/InfoModal";
import InputModal from "../../../../Modals/InputModal";
import WertModal from "../../MarketPlace/components/WertModal";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import { useOnmetaTransaction } from "../../../../hooks/use-onmeta-transaction";
import { useExchange } from "../../../../hooks/use-exchange";
import useQuery from "../../../../hooks/useQuery";
import { useLocation } from "react-router-dom";
import PaymentCompletePopup from "../PaymentCompletePopup";
import PaymentCompleteModal from "../../../../Modals/PaymentCompleteModal";
import useAuth from "../../../../hooks/useAuth";

const TopBar = ({ func, data, Index }) => {
  const localState = useHookstate(Index);

  return (
    <div className="w-[26vw] flex justify-center pt-[2rem]">
      <div>
        {data?.song_onboarding?.editions &&
          data?.song_onboarding?.editions?.length &&
          data.song_onboarding.editions.map((edition, index) => (
            <div
              onClick={() => func(index + 1)}
              key={index}
              className={`${
                localState?.value === index
                  ? "bg-gray scale-110 text-white"
                  : "text-gray"
              } duration-500 transition-all w-[300px] cursor-pointer border border-gray  h-[180px] flex items-center justify-center`}
            >
              <div className="flex flex-col items-center justify-center text-[30px]">
                <p style={{ fontFamily: "Nuform Sans" }}>
                  {/* {edition?.name?.value.toLowerCase()} */}
                  {edition?.name?.value.length < 20 ? (
                    edition?.name?.value.toLowerCase()
                  ) : localState?.value !== index ? (
                    `${edition?.name?.value.slice(0, 15).toLowerCase()}...`
                  ) : (
                    <div
                      style={{ fontFamily: "Nuform Sans" }}
                      className="w-[25rem]"
                    >
                      <Marquee
                        play={localState?.value === index ? true : false}
                        gradient={false}
                      >
                        <p style={{ fontFamily: "Nuform Sans" }}>
                          {" "}
                          {edition?.name?.value.toLowerCase()}
                        </p>
                      </Marquee>
                    </div>
                  )}
                </p>
                <p style={{ fontFamily: "Nuform Sans" }}>edition {index + 1}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const currentEdition = createState(0);

const Experience = ({
  editionData,
  editions = [],
  userPAddress,
  userEmail,
}) => {
  const localCurrentEdition = useHookstate(currentEdition);
  const marketplace = useMarketplace();
  const [paymentTier, setPaymentTier] = useState(null);
  const [showPaymentCompleteMod, setShowPaymentCompleteMod] = useState(false);

  const { _t } = useAnalytics();
  const { exchangeRates } = useExchange();
  const onmetaTransaction = useOnmetaTransaction();
  const search = useLocation().search;
  const auth = useAuth();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_ONMETA_SDK_URL;

    document.body?.appendChild(script);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(search).get("wert");
    if (query) {
      marketplace.setIsWert(query);
    }
  }, []);

  // src="https://stg.platform.onmeta.in/onmeta-sdk.js"
  // strategy="beforeInteractive"

  const changeCurrentEdition = (id) => {
    currentEdition.set(parseInt(id) - 1);
  };

  const getAbi = () => {
    let abi;

    switch (paymentTier.type) {
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
    const ContractAddress =
      marketplace.state.selectedTier.contractAddress.value;

    let provider = marketplace.getProvider();
    const signer = provider.getSigner();

    return new ethers.Contract(ContractAddress, getAbi(), signer);
  };

  async function bondedMint() {
    const fromAddress = await marketplace.getSignerAddress();
    // console.log({ signerAddress: fromAddress }); // setOpenSeaLink("Minting...");
    // const toNum = Number(marketplace.state.selectedTier.price.value);
    // console.log(
    //   "minting point",
    //   fromAddress,
    //   1,
    //   {
    //     value: toNum,
    //   },
    //   marketplace.state.selectedTier.displayPrice.value
    // );
    const newVal = ethers.utils.parseEther(
      marketplace.state.selectedTier.displayPrice.value.toString()
    );
    // let gas = await SONG_MINT().estimateGas.mint(fromAddress, 1, {
    //   value: newVal,
    // });
    // console.log({ gas });
    let mint = await SONG_MINT().mint(fromAddress, 1, {
      value: newVal,
      gasLimit: 800000,
      gasPrice: ethers.utils.parseUnits("100", "gwei"),
    });

    let txReceipt = await mint.wait();

    let songResult = txReceipt.events.filter(
      (event) => event.event == "Transfer"
    )[0];

    let tokenId = songResult.args[2];
    // setOpenSeaLink(
    //   `https://testnets.opensea.io/assets/mumbai/${tier.contractAddress}/${tokenId}`
    // );
  }
  async function auctionMint() {
    // let accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const fromAddress = await marketplace.getSignerAddress();

    // console.log({
    //   signerAddress: fromAddress,
    //   value: ethers.utils.formatEther(
    //     marketplace.state.selectedTier.price.value
    //   ),
    // });

    let mint = await SONG_MINT().mint(fromAddress, 1, {
      value: marketplace.state.selectedTier.price.value,
    });

    let txReceipt = await mint.wait();

    let songResult = txReceipt.events.filter(
      (event) => event.event == "Transfer"
    )[0];

    let tokenId = songResult.args[2];
    // console.log({ mintedTokenID: tokenId });

    // setOpenSeaLink(
    //   `https://testnets.opensea.io/assets/mumbai/${tier.contractAddress}/${tokenId}`
    // );
  }

  async function fixedMint() {
    // let accounts = await ethereum.request({ method: "eth_requestAccounts" });

    // console.log([accounts[0], 1, { value: price }]);
    // setOpenSeaLink("Minting...");
    let globalProvider = marketplace.getProvider();

    // let providerGasPrice = new ethers.providers.JsonRpcProvider(
    //   "https://polygon-mumbai.g.alchemy.com/v2/kV8qIfhZYAYxIzeQrxfHrso9_R-ITP4y"
    // );
    let providerGasPrice = globalProvider;
    let gasPrice;
    try {
      gasPrice = await providerGasPrice.getGasPrice();
      // console.log({ gasPrice: ethers.utils.formatEther(gasPrice) });
    } catch (error) {}
    try {
      // let signer = provider.getSigner();
      const fromAddress = await marketplace.getSignerAddress();
      const bal = await globalProvider.getBalance(fromAddress);
      // console.log({
      //   fromAddress,
      //   bal,
      // });
      let mint = await SONG_MINT().mint(fromAddress, 1, {
        value: marketplace.state.selectedTier.price.value,
      });
      console.log("mint.transactionHash", mint.transactionHash); //send to db
      let txReceipt = await mint.wait();

      let songResult = txReceipt.events.filter(
        (event) => event.event == "Transfer"
      )[0];

      let tokenId = songResult.args[2];
    } catch (error) {
      // console.error("fixedMint Error:", error);
      throw error;
    }

    // setOpenSeaLink(
    //   `https://testnets.opensea.io/assets/mumbai/${tier.contractAddress}/${tokenId}`
    // );
  }

  const startMint = async () => {
    let type = marketplace.state.selectedTier.type.value;
    setTimeout(() => {
      setInfoMessage({ title: "minting", message: "sit back and relax." });
    }, 500);

    try {
      switch (type) {
        case "FIXED":
          await fixedMint();
          break;
        case "BONDED":
          await bondedMint();
          break;
        case "AUCTION":
          await auctionMint();
          break;
        default:
          break;
      }

      setTimeout(() => {
        setInfoMessage({ title: "minted successfully", message: "" });
      }, 500);
      setTimeout(() => {
        setShowPaymentCompleteMod(true);
      }, 500);
      return true;
    } catch (error) {
      // console.log({ error });
      setTimeout(() => {
        setErrorMessage({
          title: "Failed at minting",
          message: error?.data?.message || error?.message,
        });
      }, 500);
      return false;
    }
  };

  const openMeta = async ({
    connectedAccountBalanceInMatic,
    publicAddress,
    cryptoAmount,
    isStaging,
    fiatAmount,
    gasInMatic,
    email,
  }) => {
    try {
      let shouldSkipOnmeta = connectedAccountBalanceInMatic > cryptoAmount;
      if (shouldSkipOnmeta) return;
      const { provider } = await marketplace.getSigner();
      if (provider === "magic") {
        console.log("magic", email);
        await marketplace.showOnmetaWidget({
          maticAmount: cryptoAmount,
          fiatAmount,
          walletAddress: publicAddress,
          userEmail: email,
          isStaging,
          gasInMatic,
        });
      } else {
        console.log("metamask", email);
        await marketplace.showOnmetaWidget({
          maticAmount: cryptoAmount,
          fiatAmount,
          walletAddress: publicAddress,
          isStaging,
          gasInMatic,
        });
      }
    } catch (error) {
      setTimeout(() => {
        setErrorMessage({
          title: "Failed at onmeta",
          message: error.toString(),
        });
      }, 500);
    }
  };

  const estimateGasInMaticForEdition = async (fromAddress) => {
    let providerGasPrice = marketplace.getProvider();
    let gasPrice;
    try {
      gasPrice = await providerGasPrice.getGasPrice();
    } catch (error) {}

    // let gasLimit = await SONG_MINT().estimateGas.mint(fromAddress, 1, {
    //   value: marketplace.state.selectedTier.price.value,
    // });
    let gasLimit = BigNumber.from(400000);
    // let finalGasLimit = gasLimit.add(20000);
    let gasInWei = gasLimit.mul(gasPrice);
    // let gasInGWei = ethers.utils.formatUnits(gasPrice, "gwei");
    // console.log(gasInGWei);
    return Number(ethers.utils.formatEther(gasInWei));
  };

  const handleFiatPayments = async () => {
    _t("PAYMENT:FIAT:CLICKED");

    // let balanceProvider = new ethers.providers.JsonRpcProvider(providerUrl);
    let { address, userProvider } = await marketplace.getSigner();

    let connectedAccountBalance = await userProvider.getBalance(address);
    let connectedAccountBalanceInMatic = Number(
      ethers.utils.formatEther(connectedAccountBalance)
    );
    console.log({ connectedAccountBalance });
    marketplace.setProvider(userProvider); // setting for minting

    console.log({ userPAddress });
    if (!userPAddress) {
      setInfoMessage({ title: "hidden" });
      alert("invalid userPublicAddress");
      return;
    }
    setInfoMessage({
      title: "initiating payment...",
      message: "please do not refresh or close this page",
    });
    let gasInMatic;
    try {
      gasInMatic = await estimateGasInMaticForEdition(userPAddress);
      console.log({ gasInWei: gasInMatic });
    } catch (err) {
      alert("Abort! unable to calculate gas");
      return;
    }
    let gasInFiat = exchangeRates(gasInMatic);

    setInfoMessage({ title: "hidden" });
    // setInfoMessage({ title: "Payment Gateway", message: "initiating.." });
    let isStaging = import.meta.env.VITE_PUBLIC_ONMETA_STAGING === "true";
    // console.log({ env: import.meta.env.VITE_PUBLIC_ONMETA_STAGING, isStaging });

    let isIndia = await marketplace.isIPIndian();
    console.log({ isIndia });
    if (!isIndia) {
      await marketplace.showWertWidget({ gasInMatic, userPAddress }, () => {
        _t("SUCCESS:WERT:PAYMENT");
        console.log("wert transaction completed successfully");
      });
    } else {
      let cryptoAmount =
        (Number(marketplace.state.selectedTier.displayPrice.value) +
          Number(gasInMatic)) *
        1.03;

      let fiatAmount =
        (Number(marketplace?.state.selectedTier.fiatPrices.inr.value) +
          Number(gasInFiat.inr)) *
        1.03;

      await openMeta({
        connectedAccountBalanceInMatic,
        isStaging,
        gasInMatic,
        publicAddress: userPAddress,
        cryptoAmount: cryptoAmount,
        fiatAmount: fiatAmount,
        email: userEmail,
      });
      if (isStaging) {
        await exchangeTokens();
        setInfoMessage({ title: "hidden" });
      }

      await startMint();
    }
  };

  const EXCHANGE_CONTRACT = () => {
    const ContractAddress = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";

    let provider = marketplace.getProvider();

    const signer = provider.getSigner();

    return new ethers.Contract(ContractAddress, ExchangeArtifacts.abi, signer);
  };

  const exchangeTokens = async () => {
    setTimeout(() => {
      setInfoMessage({ title: "exchanging WMATIC" });
    }, 500);
    const fromAddress = await marketplace.getSignerAddress();
    // console.log("after meta", { fromAddress });
    let contractInstance = EXCHANGE_CONTRACT();
    // console.log({ contractInstance });
    let balanceBigNumber = await contractInstance.balanceOf(fromAddress);
    // console.log({ fromAddress, balanceBigNumber });
    let balance = ethers.utils.formatEther(balanceBigNumber);
    // console.log({ fromAddress, balance });

    if (Number(balance) <= 0) {
      console.log(
        "SKIPPING exchange withdraw due to insufficient WMATIC balance"
      );
      return;
    }

    let txn = await contractInstance.withdraw(balanceBigNumber);
    let txReceipt = await txn.wait();
    console.log("exchange successfully done");
  };

  const handleMetamaskPayment = async () => {
    let newTxn;
    try {
      onmetaTransaction.setToken(auth.token());
      newTxn = (
        await onmetaTransaction.initiateTransaction({
          provider: "metamask",
          edition: marketplace.state?.selectedTier?.id?.value,
        })
      ).data;
    } catch (error) {
      _t("ERROR:METAMASK:INITIATE", {
        provider: "metamask",
        edition: marketplace.state?.selectedTier?.id?.value,
      });
      alert("failed to save metamask transaction");
    }

    await marketplace.checkNetwork("polygon");
    _t("PAYMENT:METAMASK:CLICKED");
    try {
      marketplace.setProvider(marketplace.createMetamaskProvider());
    } catch (error) {
      setTimeout(() => {
        setErrorMessage({
          title: "Metamask",
          message: "Metamask is not installed",
        });
      }, 500);
      return;
    }
    let mintSuccessful = await startMint();
    if (mintSuccessful) {
      _t("SUCCESS:METAMASK:PAYMENT");

      try {
        await onmetaTransaction.setOrderId(
          newTxn.id,
          marketplace.state?.selectedTier?.contractAddress?.value
        );
      } catch (error) {
        _t("ERROR:METAMASK:UPDATE", {
          txnId: newTxn.id,
          contractAddress:
            marketplace.state?.selectedTier?.contractAddress?.value,
        });
        console.log("failed to update metamask transaction");
      }
    }
  };

  // const checkForEmail = () => {
  //   if (userEmail && `${userEmail[0]}${userEmail[1]}` != "0x") {
  //     handleFiatPayments(userEmail);
  //   } else {
  //     marketplace.state.showPaymentsPopup.set(false);
  //     setTimeout(() => {
  //       setShowEmailComp(true);
  //     }, 500);
  //     return;
  //   }
  // };

  // const submit = (email) => {
  //   setShowEmailComp(false);
  //   if (email) {
  //     handleFiatPayments(email);
  //     return;
  //   }
  //   setTimeout(() => {
  //     setErrorMessage({
  //       title: "Invalid Email",
  //       message: "Please provide a valid email address",
  //     });
  //   }, 500);
  //   return;
  // };

  const initiatePayment = async (method) => {
    let handlerMap = {
      fiat: handleFiatPayments,
      metamask: handleMetamaskPayment,
    };
    let handler = handlerMap[method];
    // setShowPaymentsPopup(false);
    handler && (await handler());
  };

  const paymentMethodSelected = async (method) => {
    marketplace.state.paymentMethod.set(method);
    marketplace.state.showPaymentsPopup.set(false);
    await initiatePayment(method);
  };

  return (
    <>
      <ErrorModal></ErrorModal>
      <InfoModal></InfoModal>
      <WertModal></WertModal>
      <PaymentCompleteModal
        show={showPaymentCompleteMod}
        onClose={() => setShowPaymentCompleteMod(false)}
        submit={() => {}}
        link={paymentTier?.agreement?.url}
      ></PaymentCompleteModal>
      <div className="m-h-screen pt-[2rem] flex relative">
        {/* <InputModal
          show={showEmailComp}
          onClose={() => setShowEmailComp(false)}
          submit={submit}
        ></InputModal> */}
        <PaymentModal
          show={marketplace.state.showPaymentsPopup.get()}
          onClose={() => marketplace.state.showPaymentsPopup.set(false)}
          onSelect={paymentMethodSelected}
        ></PaymentModal>
        <OnmetaModal></OnmetaModal>
        <TopBar
          func={changeCurrentEdition}
          data={editionData}
          Index={localCurrentEdition}
        />
        <div className="w-[74vw] flex justify-center pt-[1rem]">
          <div className="w-[90%] flex flex-col justify-between border  border-black">
            <div className="m-h-[25rem] py-[2rem] bg-gray flex items-center justify-between">
              <img
                src="https://media.discordapp.net/attachments/993752598538620958/996360387928801280/Cassette.gif"
                className="h-[20rem]"
              />
              <p
                style={{ fontFamily: "Nuform Sans" }}
                className="w-[60%] text-white text-[20px] mr-[8rem]"
              >
                {
                  editionData?.song_onboarding?.editions[
                    localCurrentEdition?.value
                  ]?.description?.value
                }
              </p>
            </div>
            {editions &&
              editions?.length &&
              editions.map((tier, index) => (
                <EditionData
                  key={index}
                  tier={tier}
                  setPaymentTier={setPaymentTier}
                  isVisibility={index === localCurrentEdition?.value}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Experience);
