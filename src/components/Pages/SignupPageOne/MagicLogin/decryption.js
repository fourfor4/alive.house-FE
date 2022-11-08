import { getNodeOptions } from "./nodeOptions";
import LitJsSdk from "lit-js-sdk";
import { SiweMessage } from "siwe";
import { sign } from "./sign";
import { ethers } from "ethers";

function playSound(audio, ctx) {
  let source = ctx.createBufferSource();

  source.buffer = audio;
  source.connect(ctx.destination);
  source.start(0);

  setTimeout(() => {
    // let source = ctx.createBufferSource();
    // source.loopEnd();

    ctx.close();
  }, 6000);

  const blob = new Blob([audio], { type: "audio/mp4" });

  var newFi = URL.createObjectURL(blob);
  // console.log(newFi);
  setAud(newFi);
}

export async function decrypt(encryptedSymmetricKey, encryptedFile, chain) {
  // console.log("calling");
  const magic = getNodeOptions();
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  const signer = provider.getSigner();
  const userAdd = await signer.getAddress();
  const accessControlConditions = [
    {
      contractAddress: "0xA275504019eBCc2B55D5e1a574c7Fa1033041734",
      standardContractType: "ERC721",
      chain: "mumbai",
      method: "balanceOf",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: ">",
        value: "0",
      },
    },
  ];

  // const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "mumbai" });
  const domain = "localhost";
  const origin = "https://localhost/login";
  const statement =
    "This is a test statement.  You can put anything you want here.";

  const siweMessage = new SiweMessage({
    domain,
    address: userAdd,
    statement,
    uri: origin,
    version: "1",
    chainId: 80001,
  });

  const messageToSign = siweMessage.prepareMessage();

  const signature = await sign(messageToSign);

  // console.log("signature", signature);

  const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);

  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };

  // console.log("authSig", authSig);
  const client = new LitJsSdk.LitNodeClient();
  // console.log("decrypt", { client });
  await client.connect();
  //   console.log({ encryptedSymmetricKey, encryptedSymmetricKey1 });
  const symmetricKey = await client.getEncryptionKey({
    accessControlConditions,
    toDecrypt: encryptedSymmetricKey,
    chain,
    authSig,
  });

  //   console.log("fileE", { encryptedFile, encryptedFile1 });

  const decryptedString = await LitJsSdk.decryptFile({
    file: encryptedFile,
    symmetricKey,
  });
  console.log("success", decryptedString);

  let ctx = new AudioContext();

  // let buffer = ctx.createBuffer()

  let audio = await ctx.decodeAudioData(decryptedString);
  // .then((audio) =>{
  //    ctx.decodeAudioData(audio).then((res) => { console.log('res', res);
  //   })});
  // let audio2 = await ctx.decodeAudioData(audio);
  // await audio.wait();
  console.log("audio", audio);
  playSound(audio, ctx);

  // function playSound(audio) {
  //   let source = ctx.createBufferSource();

  //   source.buffer = audio;
  //   source.connect(ctx.destination);
  //   source.start(0);

  //   setTimeout(() => {
  //     // let source = ctx.createBufferSource();
  //     // source.loopEnd();

  //     ctx.close();
  //   }, 6000);

  //   const blob = new Blob([audio], { type: "audio/mp4" });
  //   console.log("aud", blob);

  //   var newFi = URL.createObjectURL(blob);
  //   console.log(newFi);
  //   setAud(newFi);
  // }

  // useEffect(() => {
  //   console.log({ encryptedFile1, encryptedSymmetricKey1 });
  // }, [encryptedFile1, encryptedSymmetricKey1]);

  // const networks = {
  //   polygon: {
  //     chainId: `0x${Number(137).toString(16)}`,
  //     chainName: "Polygon Mainnet",
  //     nativeCurrency: {
  //       name: "MATIC",
  //       symbol: "MATIC",
  //       decimals: 18,
  //     },
  //     rpcUrls: ["https://polygon-rpc.com/"],
  //     blockExplorerUrls: ["https://polygonscan.com/"],
  //   },
  // };

  // const changeNetwork = async ({ networkName, setError }) => {
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_addEthereumChain",
  //       params: [
  //         {
  //           ...networks[networkName],
  //         },
  //       ],
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // const checkNetwork = async (networkName) => {
  //   if (!window.ethereum) {
  //     setError("Metamask not installed!");
  //     alert(
  //       "Metamask does not seem to be installed. Please install and come back, or you may use the signup with email option!"
  //     );
  //     return;
  //   } else {
  //     const currentChainId = await window.ethereum.request({
  //       method: "eth_chainId",
  //     });
  //     if (currentChainId !== networks[networkName].chainId) {
  //       setError(
  //         "Metamask is not connected to Polygon. We will try to add the network and switch to it!"
  //       );

  //       await changeNetwork({ networkName, setError });
  //     }
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     setUserAddress(accounts[0]);
  //     await generateNonce(accounts[0], gameplayStatus, claimStatus);
  //   }
  // };

  // const networkChanged = (chainId) => {
  //   const networkName = "polygon";
  //   if (chainId !== networks["networkName"].chainId) {
  //     setError("Changing back to Polygon!");
  //     changeNetwork({ networkName, setError });
  //   }
  // };

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on("chainChanged", networkChanged);
  //   }
  //   return () => {
  //     if (window.ethereum) {
  //       window.ethereum.removeListener("chainChanged", networkChanged);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (Nonce) {
  //     signNonce(Nonce);
  //   }
  // }, [Nonce]);

  // const handleMagiclinkLogin = async () => {
  //   tracker.track(`button:MagicLogin:click`);
  //   let didToken = await magic.auth.loginWithMagicLink({ email: UserEmail });
  //   try {
  //     const { email, publicAddress } = await magic.user.getMetadata();
  //     await verfyMagicUser(
  //       didToken,
  //       publicAddress,
  //       email,
  //       claimStatus,
  //       gameplayStatus
  //     );
  //     if (claimStatus) {
  //       dispatch(nextStep("userSignedIn"));
  //     } else {
  //       dispatch(showAudioPage(false));
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // useEffect(() => {
  //   if (UserEmail) {
  //     setSignedInvia("Magic");
  //     handleMagiclinkLogin();
  //   }
  // }, [UserEmail]);

  // const generateMagicComponent = (enableFunctionality) => {
  //   const currentConnector = () => enableFunctionality && magic;
  //   const activating = currentConnector === activatingConnector;
  //   const connected = currentConnector === connector;
  //   const disabled =
  //     !triedEager || !!activatingConnector || connected || !!error;

  //   return (
  //     <div
  //       className="signup_button_container"
  //       style={{
  //         cursor: disabled ? "unset" : "pointer",
  //         borderColor: activating ? "orange" : connected ? "green" : "unset",
  //       }}
  //     >
  //       {/* <button
  //       style={{
  //         position: "absolute",
  //         bottom: "-100px",
  //         width: "100px",
  //         height: "50px",
  //       }}
  //       onClick={deactivate}
  //     >
  //       deactivate
  //     </button> */}
  //       <div
  //         style={{ pointerEvents: UserEmail && "none" }}
  //         className="setSignup_layer"
  //         onClick={handleMagiclink}
  //       ></div>
  //       <div className={`signup_button Magic`}>
  //         <div className="signup_button_image_container">
  //           <img src={emailImage} alt="wallet" />
  //         </div>
  //         {enableFunctionality && activating && (
  //           <Spinner
  //             color={"black"}
  //             style={{ height: "25%", marginLeft: "-1rem" }}
  //           />
  //         )}
  //         {connected ? (
  //           <h1 role="img" aria-label="check">
  //             Metamask
  //           </h1>
  //         ) : (
  //           <h1>signup/register with email</h1>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // const generateMetamaskComponent = () => {
  //   const currentConnector = injected;
  //   const activating = currentConnector === activatingConnector;
  //   const connected = currentConnector === connector;
  //   const disabled =
  //     !triedEager || !!activatingConnector || connected || !!error;
  //   return (
  //     <div
  //       className="signup_button_container"
  //       style={{
  //         cursor: disabled ? "unset" : "pointer",
  //         borderColor: activating ? "orange" : connected ? "green" : "unset",
  //       }}
  //       onClick={() => {
  //         checkNetwork("polygon");
  //       }}
  //     >
  //       <div className={`signup_button Metamask`}>
  //         <div className="signup_button_image_container">
  //           <img src={walletImage} alt="wallet" />
  //         </div>
  //         {activating && (
  //           <Spinner
  //             color={"black"}
  //             style={{ height: "25%", marginLeft: "-1rem" }}
  //           />
  //         )}
  //         {connected ? (
  //           <h1 role="img" aria-label="check">
  //             Metamask
  //           </h1>
  //         ) : (
  //           <h1>Metamask</h1>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // return (
  //   <>
  //     <motion.div
  //       initial={{ transform: "scale(0)" }}
  //       animate={{ transform: "scale(1)" }}
  //       exit={{ transform: "scale(0)" }}
  //       className="signup_page_container"
  //     >
  //       <ToastContainer
  //         zIndex="100"
  //         position="top-right"
  //         autoClose={5000}
  //         hideProgressBar={false}
  //         newestOnTop={false}
  //         closeOnClick
  //         rtl={false}
  //         pauseOnFocusLoss
  //         draggable
  //         pauseOnHover
  //       />
  //       <ToastContainer />
  //       <AnimatePresence exitBeforeEnter>
  //         {showInputSignupPage && <SignupPageTwo />}
  //       </AnimatePresence>
  //       <Header />
  //       {generateMetamaskComponent()}
  //       {generateMagicComponent(UserEmail)}
  //       <div
  //         style={{
  //           position: "absolute",
  //           bottom: "2rem",
  //           right: "2rem",
  //           zIndex: 100,
  //           width: "20vw",
  //           height: "5vh",
  //         }}
  //       >
  //         {!!error && <h4>{getErrorMessage(error)}</h4>}
  //       </div>
  //       {/* <button onClick={encrypt}>Encrypt</button>
  //     <button onClick={decrypt}>Decrypt</button> */}
  //     </motion.div>
  //   </>
  // );
}
