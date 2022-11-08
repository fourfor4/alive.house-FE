import { motion } from "framer-motion";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";

import "./index.scss";
import WalletImg from "../Images/wallet.png";
import MailImg from "../Images/mail.png";
import { changeMobileViewPage } from "../../../globalHooks";
import { useEagerConnect } from "../../../hooks/useEagerConnect";
import { useInactiveListener } from "../../../hooks/useInactiveListener";
import { generateNonce } from "../../../assets/AudioPage/SignupPageOne/ActionsMetamask";
import {
  createMagicUser,
  verfyMagicUser,
} from "../../AudioPage/SignupPageOne/ActionsMagic";
const VITE_METAMASK_NETWORK = import.meta.env.VITE_METAMASK_NETWORK;
const index = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  const [activatingConnector, setActivatingConnector] = useState();
  const [Error, setError] = useState();
  const [UserAddress, setUserAddress] = useState("");
  const [email, setEmail] = useState("");
  const [withMagic, setWithMagic] = useState(false);

  useEffect(() => {
    if (active) {
      changeMobileViewPage("pagethree");
    }
  }, [active]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  const customNodeOptions = {
    rpcUrl: "https://rpc-mainnet.maticvigil.com/", // Polygon RPC URL
    chainId: 137, // Polygon chain id
  };
  const magic = new Magic(import.meta.env.VITE_MAGIC_API_KEY, {
    network: customNodeOptions,
  });

  const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
  };

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const checkNetwork = async (networkName) => {
    if (!window.ethereum) {
      setError("Metamask not installed!");
      alert(
        "Metamask does not seem to be installed. Please install and come back, or you may use the signup with email option!"
      );
      return;
    } else {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (currentChainId !== networks[networkName].chainId) {
        setError(
          "Metamask is not connected to Polygon. We will try to add the network and switch to it!"
        );

        await changeNetwork({ networkName, setError });
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);
      await generateNonce(accounts[0], "", "");
    }
  };

  const networkChanged = (chainId) => {
    const networkName = VITE_METAMASK_NETWORK;
    if (chainId !== networks["networkName"].chainId) {
      setError("Changing back to Polygon!");
      changeNetwork({ networkName, setError });
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", networkChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", networkChanged);
      }
    };
  }, []);

  const handleMagiclinkLogin = async (email) => {
    let didToken = await magic.auth.loginWithMagicLink({ email });
    try {
      const { email, publicAddress } = await magic.user.getMetadata();
      await createMagicUser(publicAddress, email);
      await verfyMagicUser(didToken, publicAddress, email);
      changeMobileViewPage("pagethree");
    } catch (err) {
      setError(err.message);
    }
  };

  const validateEmail = (email) => {
    setWithMagic(false);
    const filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
      handleMagiclinkLogin(email);
    } else {
      return false;
    }
  };

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
      className="mobileView_pageTwo_container"
    >
      <div className="action_container" onClick={() => setWithMagic(true)}>
        <img src={MailImg} alt="mail" />
      </div>
      <div className="action_container" onClick={() => checkNetwork("polygon")}>
        <img src={WalletImg} alt="wallet" />
      </div>
      {withMagic && (
        <div className="mobileView_Email_Input">
          <div className="opac low"></div>
          <div className="opac high">
            <div className="email_input">
              <div className="input_field">
                <input
                  type="text"
                  placeholder="type your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className="signup_button"
                style={{
                  backgroundColor: email ? "#53e1ad" : "#808080",
                  pointerEvents: email ? "fill" : "none",
                }}
                onClick={() => validateEmail(email)}
              >
                <h2>Signup</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default index;
