// import { fromString as uint8arrayFromString } from "uint8arrays/from-string";
import { useEffect, useState } from "react";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
// import { encrypt } from "./MagicLogin/encryption";
// import { decrypt } from "./MagicLogin/decryption";
// import { formatEther } from '@ethersproject/units'
// import { useEagerConnect } from "../../../hooks/useEagerConnect";
// import { useInactiveListener } from "../../../hooks/useInactiveListener";
import { injected } from "../../../connectors/connectors";
import GenerateMetamaskComponent from "./MetamsakComponent";
import GenerateMagicComponent from "./MagicComponent";
import Animatepage from "../../../assets/comps/AnimateComponent";
import Nav from "../HomeScreenPage/components/Nav";
import { useLoginUser, usePaymentPending } from "../../../globalStates/Home";
import useRouter from "../../../hooks/useRouter";
import { useHookstate } from "@hookstate/core";
import background from "../../../public/Images/background.png";
import { setErrorMessage } from "../../../hooks/useErrors";
import useMarketplace from "../../../hooks/use-marketplace";

// const getErrorMessage = (error) => {
//   return error.messsage;
//   // function getErrorMessage(UserRejectedRequestErrorInjected) {
//   if (error instanceof NoEthereumProviderError) {
//     return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
//   } else if (error instanceof UnsupportedChainIdError) {
//     return "You're connected to an unsupported network.";
//   } else if (
//     error instanceof UserRejectedRequestErrorInjected ||
//     error instanceof UserRejectedRequestErrorWalletConnect ||
//     error instanceof UserRejectedRequestErrorFrame
//   ) {
//     return "Please authorize this website to access your Ethereum account.";
//   } else {
//     console.error(error);
//     return "An unknown error occurred. Check the console for more details.";
//   }
// };
// const ChainId = () => {
//   // function ChainId() {
//   const { chainId } = useWeb3React();

//   return (
//     <>
//       {/* <span>Chain Id</span>
//         <span role="img" aria-label="chain">
//           ⛓
//         </span> */}
//       <span>{chainId ?? ""}</span>
//     </>
//   );
// };
// function Account() {
//   var { account, library } = useWeb3React();
//   // const isHmyLibrary = (library?.messenger?.chainType === 'hmy')
//   // account = (isHmyLibrary && account) ? toBech32(account) : account

//   return (
//     <>
//       {/* <span>Account</span>
//         <span role="img" aria-label="robot">
//           🤖
//         </span> */}
//       {/* <span>
//         {account === null
//           ? "-"
//           : account
//           ? `${account.substring(0, 6)}...${account.substring(
//               account.length - 4
//             )}`
//           : ""}
//       </span> */}
//     </>
//   );
// }
// const Balance = () => {
//   //   function Balance() {
//   const { account, library, chainId } = useWeb3React();
//   // const isHmyLibrary = (library?.messenger?.chainType === 'hmy')

//   const [balance, setBalance] = useState();
//   useEffect(() => {
//     if (!!account && !!library) {
//       let stale = false;
//       // let accountArgs = account //isHmyLibrary ? { address: toBech32(account) } : account

//       library
//         .getBalance(account)
//         .then((result) => {
//           if (!stale) {
//             setBalance(result / 1e18);
//           }
//         })
//         .catch(() => {
//           if (!stale) {
//             setBalance(null);
//           }
//         });

//       return () => {
//         stale = true;
//         setBalance(undefined);
//       };
//     }
//   }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

//   return (
//     <>
//       {/* <span>Balance</span>
//         <span role="img" aria-label="gold">
//           💰
//         </span> */}
//       {
//         /* <span>{balance === null ? 'Error' : balance ? (isHmyLibrary ? formatEther(balance) : `Ξ${formatEther(balance)}`) : ''}</span> */
//         <span>{balance === null ? "Error" : balance}</span>
//       }
//     </>
//   );
// };

// const Header = () => {
//   const { active, error } = useWeb3React();

//   return (
//     <>
//       {active ? (
//         <div className="grid grid-cols-2 gap-6">
//           <div className="flex justify-center text-2xl border-2 border-gray-300 rounded-xl p-2 bg-gray-100">
//             <Account />
//           </div>
//           <div className="flex justify-center text-2xl border-2 border-gray-300 rounded-xl p-2 bg-gray-100">
//             <Balance />
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

const ConnectWallet = () => {
  const localState = useHookstate(useLoginUser());
  const paymentState = useHookstate(usePaymentPending());
  const router = useRouter();
  const marketplace = useMarketplace();

  const [encryptedFile1, setEncryptedFile] = useState(null);
  const [encryptedSymmetricKey1, setEncryptedSymmetricKey] = useState(null);

  const chain = "mumbai";
  const standardContractType = "ERC721";

  // const context = useWeb3React();
  // const {
  //   connector,
  //   library,
  //   chainId,
  //   account,
  //   activate,
  //   deactivate,
  //   active,
  //   error,
  // } = context;

  useEffect(() => {
    if (localState?.value) {
      if (paymentState?.value) {
        setTimeout(() => {
          marketplace.state.showPaymentsPopup.set(true);
        }, 500);
      } else {
        router.push("/Home");
      }
    }
  }, [localState?.value]);

  useEffect(() => {
    return () => {
      setErrorMessage({
        title: "",
        message: "",
      });
    };
  }, []);

  // const injectedConnector = new InjectedConnector({supportedChainIds: [1,3, 4, 5, 42, ],})
  // const { chainId, account, activate, active, library } = useWeb3React()
  const [activatingConnector, setActivatingConnector] = useState();
  // useEffect(() => {
  //   if (activatingConnector && activatingConnector === connector) {
  //     setActivatingConnector(undefined);
  //   }
  // }, [activatingConnector, connector]);
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  // const triedEager = useEagerConnect();
  // useInactiveListener(!triedEager || !!activatingConnector);

  // const EncryptedFileData = (data) => {
  //   setEncryptedFile(data);
  // };
  // const EncryptedSymmetricKeyData = (data) => {
  //   setEncryptedSymmetricKey(data);
  // };

  // useEffect(() => {
  //   if ((encryptedFile1, encryptedSymmetricKey1)) {
  //     decrypt(encryptedSymmetricKey1, encryptedFile1, chain);
  //   }
  // }, [encryptedFile1, encryptedSymmetricKey1]);

  return (
    <Animatepage>
      <Nav />
      <div
        className={`w-screen min-h-[calc(100vh-90px)] relative bg-cover bg-no-repeat bg-center flex justify-center items-center`}
      >
        <img
          src={background}
          alt="background Image"
          className="w-full absolute object-cover top-0 h-full z-0"
        />

        <div className="w-[650px] h-[250px] flex">
          <GenerateMetamaskComponent />
          <GenerateMagicComponent />
        </div>
      </div>
    </Animatepage>
  );
};

export default ConnectWallet;
{
  /* <input
style={{ position: "absolute", top: 0, right: 0 }}
type="file"
onChange={(e) => {
  encrypt(e, EncryptedFileData, EncryptedSymmetricKeyData, chain);
}}
id="audio"
/> */
}
