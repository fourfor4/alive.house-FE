import { createState, useHookstate } from "@hookstate/core";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { setshowLoader, useUserDetails } from "../globalStates/Home";
import { useAnalytics } from "./useAnalytics";
import useAuth from "./useAuth";
import { setInfoMessage, setErrorMessage } from "./useErrors";
import useRouter from "./useRouter";
import { v4 as uuidv4 } from "uuid";
import FixedArtifacts from "../artifacts/AliveFixedUpgradeable.json";
import BondedArtifacts from "../artifacts/AliveBondedUpgradeable.json";
import AuctionArtifacts from "../artifacts/AliveDutchUpgradeable.json";
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import { Buffer } from "buffer";
import { useOnmetaTransaction } from "./use-onmeta-transaction";
import { useService, serviceWithAuth } from "./useService";
import { useLocation } from "react-router-dom";
import useQuery from "./useQuery";

window.Buffer = Buffer;
let provider = null;
let magic = null;
let magicProvider = null;
const ONMETA_TIMEOUT_FAKE_SUCCESS_TXN = 30000;

const initialState = {
  tiers: null,
  selectedTier: null,
  paymentMethod: null,
  showPaymentsPopup: false,
  showOnmeta: false,
  showOnRamper: false,
  showWertWidget: false,
  isWertDismissable: true,
  wertOptions: {},
  ORDER_EVENTS: {},
  lastTransactionAmount: { crypto: null, fiat: null },
  isMagicLoggedIn: false,
};

const _marketplaceState = createState(JSON.parse(JSON.stringify(initialState)));
const VITE_PUBLIC_POLYGON_PROVIDER = import.meta.env
  .VITE_PUBLIC_POLYGON_PROVIDER;
const VITE_PUBLIC_POLYGON_SCAN = import.meta.env.VITE_PUBLIC_POLYGON_SCAN;
const networks = {
  polygon_dev: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mumbai - Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [VITE_PUBLIC_POLYGON_PROVIDER],
    blockExplorerUrls: [VITE_PUBLIC_POLYGON_SCAN],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [VITE_PUBLIC_POLYGON_PROVIDER],
    blockExplorerUrls: [VITE_PUBLIC_POLYGON_SCAN],
  },
};

const customNodeOptions = {
  // rpcUrl: "https://rpc-mainnet.maticvigil.com/", // Polygon RPC URL
  rpcUrl: import.meta.env.VITE_MAGIC_RPC_URL, // Polygon RPC URL
  chainId: import.meta.env.VITE_MAGIC_CHAINID,
  // chainId: 137, // Polygon chain id
};

const service_path = "song/isIndianIP";

const useMarketplace = () => {
  const auth = useAuth();
  const { _t } = useAnalytics();
  // const router = useRouter();
  const state = useHookstate(_marketplaceState);
  const userDetails = useHookstate(useUserDetails());
  const [editions, setEditions] = useState([]);
  const onmetaTransaction = useOnmetaTransaction();
  const meta = useRef(null);
  const [isWert, setIsWert] = useState(false);
  let service = useRef(useService(service_path));

  // useEffect(() => {
  //   console.log({ isWert });
  // }, [isWert]);

  const metaTimeout = useRef();

  const isIPIndian = async () => {
    // return false;
    if (isWert) return false;

    service.current = serviceWithAuth(service_path);
    let result = await service.current.get();
    return result?.data?.data;
  };

  const getAbi = useMemo(() => {
    let tier = state?.selectedTier?.value;
    let abi;
    switch (tier?.type) {
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
  }, [state?.selectedTier?.value]);

  const magicInstance = () => {
    magic =
      magic ||
      new Magic(import.meta.env.VITE_MAGIC_API_KEY, {
        network: customNodeOptions,
      });
    return magic;
  };

  const setProvider = (p) => {
    provider = p;
  };

  const getProvider = (p) => {
    return provider;
  };
  const networkChanged = () => {
    const networkName = "polygon";
    if (chainId !== networks[networkName].chainId) {
      setInfoMessage({
        title: "Switching to polygon",
        message: "",
      });
      changeNetwork(networkName);
    }
  };
  const changeNetwork = async (networkName) => {
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
      console.log(err);
    }
    setInfoMessage({
      title: "",
      message: "",
    });
  };

  const checkNetwork = async (networkName) => {
    if (!window.ethereum) {
      setErrorMessage({
        title: "Metamask not found",
        message:
          "Metamask does not seem to be installed. Please install and come back, or you may use the signup with email option!",
      });
      return;
    } else {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      // console.log({ currentChainId, not: networks[networkName].chainId });
      if (currentChainId !== networks[networkName].chainId) {
        setInfoMessage({
          title: "Switch network",
          message:
            "Metamask is not connected to Polygon. We will try to add the network and switch to it!",
        });

        await changeNetwork(networkName);
      }
      const account = await getAddress();
      // setUserAddress(accounts[0]);
      // generateNonce(accounts[0]);
      // saveMetaUserInfo(account);
    }
  };

  const saveMetaUserInfo = async (accounts) => {
    const response = await auth.getData(
      accounts,
      "generate-nonce?publicAddress="
    );
    let status;
    let res;
    if (response?.error?.message === "This publicAddress does not exist") {
      const password = auth.generateRandomPassword();
      const email = `${accounts}@gmail.com`;
      const username = accounts;
      const publicAddress = accounts;
      userDetails.MetapublicAddress.set(publicAddress);
      status = await auth.createAndVerify(
        { email, password, username, publicAddress },
        "local/register"
      );
      res = await auth.getData(accounts, "generate-nonce?publicAddress=");
    }

    (response?.error || status?.error || res?.error) &&
      setErrorMessage({
        title: "something went wrong",
        message: `${response.error.message}`,
      });
    const result = await auth.verifyUser(accounts, response.nonce || res.nonce);
    result.jwt && _t("SUCCESS:LOGIN:METAMASK");
    result.jwt && auth.setToken(result.jwt);
    result.error &&
      setErrorMessage({
        title: "Something went wrong",
        message: `${result.error.message}`,
      });
  };

  const createMagicProvider = () => {
    let mInstance = magicInstance().rpcProvider;
    magicProvider =
      magicProvider || new ethers.providers.Web3Provider(mInstance);
    return magicProvider;
  };
  const createMetamaskProvider = () => {
    if (!window.ethereum) {
      setInfoMessage({
        title: "metamask",
        message: "not found",
      });
      return;
    }
    return new ethers.providers.Web3Provider(window.ethereum);
  };
  const getAddress = async () => {
    let account = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return account[0];
  };

  const loginMagic = async (email) => {
    setTimeout(() => {
      setshowLoader(true);
    }, 500);
    let Email = email;
    try {
      magic = magicInstance();
      // let emailFromPromp = userEmail.value;

      let didToken = await magic.auth.loginWithMagicLink({
        // email: "cuterajat26@gmail.com",
        email: Email,
      });

      const { email, publicAddress } = await magic.user.getMetadata();
      userDetails.MagicPublicAddress.set(publicAddress);
      if (!publicAddress || !didToken) {
        setErrorMessage({
          title: "Something went wrong",
          message: "",
        });
        return;
      }
      state.isMagicLoggedIn.set(true);

      const password = auth.generateRandomPassword();
      if (!password) {
        return;
      }
      const response = await auth.createAndVerify(
        { didToken, publicAddress },
        "verify-didtoken"
      );
      // setUserEmail(email);
      // setUserPublicAddress(publicAddress);
      let result;
      if (response.error) {
        if (response.error.message === "This publicAddress does not exist") {
          const username = publicAddress;
          result = await auth.createAndVerify(
            { email, password, username, publicAddress },
            "local/register"
          );
          setTimeout(() => {
            setErrorMessage({
              title: "Something went wrong",
              message: `${result.error.message}`,
            });
          }, 500);
        } else {
          setshowLoader(false);
          setTimeout(() => {
            setErrorMessage({
              title: "Email already taken",
              message: response.error.message,
            });
          }, 500);
          return;
        }
      }
      (response.jwt || result.jwt) && _t("SUCCESS:LOGIN:MAGIC");
      (response.jwt || result.jwt) && auth.setToken(response.jwt || result.jwt);
      // router.push("/");
      setshowLoader(false);
      return { email, publicAddress, didToken };
    } catch (err) {
      console.log("loginMagicError", err);
      throw err;
    }
  };

  const loginMetamask = async () => {
    try {
      setProvider(createMetamaskProvider());
      // const address = await getAddress();
      // console.log({address})
      saveMetaUserInfo(address);
    } catch (err) {
      console.log({ err });
    }
  };

  const convertCryptoToFiat = async (crypto) => {
    let amount = crypto * 73;
    return amount < 100 ? 100 : amount;
  };

  const showOnRamper = async () => {
    _marketplaceState.showOnRamper.set(true);
  };
  const showWertWidget = async ({ gasInMatic, userPAddress }, done) => {
    createWertOptions({ gasInMatic, userPAddress }, done)
      .then((data) => {
        state?.wertOptions.set(data);
        _marketplaceState.isWertDismissable.set(false);
        _marketplaceState.showWertWidget.set(true);
      })
      .catch((error) => {
        console.log("ERROR:wertoptions", { error });
      });
  };

  const showOnmetaWidget = async ({
    maticAmount,
    fiatAmount,
    walletAddress,
    userEmail,
    isStaging,
    gasInMatic,
  }) => {
    return new Promise(async (resolve, reject) => {
      _marketplaceState.lastTransactionAmount.crypto.set(maticAmount);
      let newTxn;
      try {
        onmetaTransaction.setToken(auth.token());
        newTxn = (
          await onmetaTransaction.initiateTransaction({
            provider: "onmeta",
            edition: state?.selectedTier?.id?.value,
          })
        ).data;
      } catch (error) {
        alert("failed to save onmeta transaction");
      }
      const onmetaAPIKEY = import.meta.env.VITE_ONMETA_API_KEY + "";
      const onmetaCHAINID = import.meta.env.VITE_ONMETA_CHAIN_ID + "";
      // let fiatAmount = await convertCryptoToFiat(maticAmount);
      _marketplaceState.lastTransactionAmount.fiat.set(fiatAmount);
      fiatAmount = isStaging ? 100 : fiatAmount;
      meta.current = new onMetaWidget({
        elementId: "onmeta-widget", // Mandatory (It should be an id of an element not a class)
        apiKey: onmetaAPIKEY, // Mandatory
        walletAddress: walletAddress || "", // Optional
        fiatAmount: fiatAmount || "", // Optional (If passed then minimum amount is 100 inr)
        userEmail: userEmail, // Optional (if passed user don't have to register in meta platform)
        chainId: onmetaCHAINID, // Optional (it should be passed along with the tokenAddress to show a particular token to the user)
        // tokenAddress: state?.selectedTier?.contractAddress?.value,
      });
      function markTransactionCompleted() {
        metaTimeout.current && clearTimeout(metaTimeout.current);
        _marketplaceState.ORDER_EVENTS.paymentStatus.set("completed");
        resolve();
      }
      function dismissModal() {
        _marketplaceState.showOnmeta.set(false);
      }
      meta.current.on("ORDER_EVENTS", async (data) => {
        //TODO : create a transaction with orderId and paymentStatus
        _t("ONMETA:ORDER_EVENTS", data);
        try {
          data?.orderId &&
            (await onmetaTransaction.setOrderId(newTxn.id, data.orderId));
        } catch (error) {
          alert("failed to update onmeta transaction");
        }
        _marketplaceState.ORDER_EVENTS.merge(data);
        // console.log(data);
        if (data.paymentStatus === "pending" && isStaging) {
          metaTimeout.current = setTimeout(() => {
            // fake success behaviour
            markTransactionCompleted();
            dismissModal();
          }, ONMETA_TIMEOUT_FAKE_SUCCESS_TXN);
        }
        await onmetaTransaction.update(newTxn.id, {
          txnStatus: data.paymentStatus,
          cryptoStatus: data.cryptoSwap,
        });
        if (data.paymentStatus === "success" && data.cryptoSwap === "success") {
          markTransactionCompleted();
          dismissModal();
        }
        // setOrderId(data.orderId);
        /**{cryptoSwap: "pending"
      eventType: "orderCreated"
      orderId: "62906f4cb1708d8c7fd68f78"
      paymentStatus: "pending"} */
      });
      meta.current.on("ALL_EVENTS", (status) => {
        console.log(status);
      });
      setTimeout(() => {
        _marketplaceState.showOnmeta.set(true);
        meta.current.init();
      }, 500);
    });
  };

  const getMagicAddress = async () => {
    if (!state.isMagicLoggedIn.value) throw new Error("Magic is not logged in");

    const isLoggedIn = await magicInstance().user.isLoggedIn();
    console.log("fiat3");
    if (!isLoggedIn) throw new Error("not logged in");
    console.log("fiat4");
    let p = createMagicProvider();
    console.log("fiat5");
    let signer = p.getSigner();
    return signer.getAddress();
  };

  const getMetamaskAddress = async () => {
    let accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  };

  const getSigner = async () => {
    if (window.ethereum) {
      let accounts = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const b = await getMetamaskAddress();
        return {
          address: b,
          userProvider: createMetamaskProvider(),
          provider: "metamask",
        };
      } else {
        const a = await getMagicAddress();
        return {
          address: a,
          userProvider: createMagicProvider(),
          provider: "magic",
        };
      }
    } else {
      const c = await getMagicAddress();
      return {
        address: c,
        userProvider: createMagicProvider(),
        provider: "magic",
      };
    }
  };

  const getSignerAddress = async () => {
    let method = state?.paymentMethod?.value;
    // console.log({ method });
    switch (method) {
      case "metamask":
        let accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        return accounts[0];

      case "fiat": {
        console.log("fiat1");
        if (!state.isMagicLoggedIn.value)
          throw new Error("Magic is not logged in");
        console.log("fiat2");
        const isLoggedIn = await magic.user.isLoggedIn();
        console.log("fiat3");
        if (!isLoggedIn) throw new Error("not logged in");
        console.log("fiat4");
        let p = getProvider() || createMagicProvider();
        console.log("fiat5");
        let signer = p.getSigner();
        return signer.getAddress();
      }
      default:
        throw new Error(`Unsopported method:${method}`);
        break;
    }
  };

  const magicLogout = async () => {
    // magic && (await magic.user.logout());
    state.isMagicLoggedIn.set(false);
  };

  const createWertOptions = async ({ gasInMatic, userPAddress }, done) => {
    const privateKey = import.meta.env.VITE_WERT_PRIVATE_KEY + "";
    let accountFromProvider = await getSignerAddress();
    let account = userPAddress;

    let abi = getAbi;
    let contractAddress = state?.selectedTier?.contractAddress?.value;

    let iface = new ethers.utils.Interface(abi);
    let inputData = iface.encodeFunctionData("mint", [account, 1]);
    const signedData = signSmartContractData(
      {
        address: account,
        commodity: "MATIC",
        commodity_amount: (
          (Number(ethers.utils.formatEther(state?.selectedTier?.price?.value)) +
            Number(gasInMatic)) *
          1.03
        ).toFixed(6),
        pk_id: "key1",
        sc_address: contractAddress,
        sc_id: uuidv4(), // must be unique for any request
        sc_input_data: inputData,
      },
      privateKey
    );
    let prefix = import.meta.env.VITE_EXTERNAL_TXN_PREFIX || ""; // this is needed to reroute dev/staging webhook callbacks received on prod
    let click_id = `${prefix}-` + uuidv4();
    try {
      onmetaTransaction.setToken(auth.token());
      await onmetaTransaction.initiateTransaction({
        orderId: click_id,
        provider: "wert",
        edition: state?.selectedTier?.id?.value,
      });
    } catch (error) {
      console.log("failed to save transaction", error);
      alert("failed to save transaction");
    }

    const otherWidgetOptions = {
      partner_id: import.meta.env.VITE_WERT_PARTNER_ID,
      container_id: "wert-widget",
      click_id, // unique id of purhase in your system
      origin: import.meta.env.VITE_WERT_ORIGIN, // this option needed only for this example to work
      width: 440,
      height: 595,
      listeners: {
        loaded: () => console.log("loaded"),
        position: (info) => {
          _t(`WERT:STEP:${info.step}`);
          console.log("position ---- ", info);
        },
        close: (info) => {
          console.log("close---, ", info);
          state.isWertDismissable.set(true);
        },
        error: (error) => {
          console.log("error ---, ", error);
          state.isWertDismissable.set(true);
        },
        "payment-status": (info) => {
          _t(`WERT:PAYMENT:${info.status}`);
          console.log("payment-status- ----, ", info);
          state.isWertDismissable.set(info.status === "success");
          info.status === "success" && done && done();
        },
      },
    };
    return {
      ...signedData,
      ...otherWidgetOptions,
    };
  };

  return {
    setProvider,
    getProvider,
    createMagicProvider,
    createMetamaskProvider,
    saveMetaUserInfo,
    loginMagic,
    magicLogout,
    state,
    getAddress,
    showOnmetaWidget,
    showOnRamper,
    showWertWidget,
    getSignerAddress,
    magicInstance,
    isIPIndian,
    loginMetamask,
    checkNetwork,
    setIsWert,
    getSigner,
  };
};

export default useMarketplace;
