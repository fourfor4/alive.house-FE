import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { SiweMessage } from "siwe";
import { getNodeOptions } from "./nodeOptions";
import { sign } from "./sign";

export async function encrypt(
  e,
  EncryptedFileData,
  EncryptedSymmetricKeyData,
  chain
) {
  const magic = getNodeOptions();
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  const signer = provider.getSigner();

  const file = e.target.files[0];
  console.log("file", file);

  const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({
    file,
  });

  console.log("enS", encryptedFile);

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

  // const privKey = process.env.PRIVATE_KEY_1;
  // const privKeyBuffer = uint8arrayFromString(privKey, "base16");
  // const wallet = new ethers.Wallet(
  //   "0xe17e70beecab776bf81fd6d5df637cc816cf5306f20020faf948db92017a63b2"
  // );

  const domain = "localhost";
  const origin = "https://localhost/login";
  const statement =
    "This is a test statement.  You can put anything you want here.";

  const userAdd = await signer?.getAddress();
  console.log({ userAdd });

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

  console.log("signature", signature);

  //     // Sign the string message
  // let flatSig = await wallet.signMessage(message);

  // // For Solidity, we need the expanded-format of a signature
  let sig = ethers.utils.splitSignature(signature);

  // // Call the verifyString function
  // let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);

  const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);
  console.log({ recoveredAddress });

  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };
  // const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "mumbai" });

  console.log("authSig", authSig);
  const client = new LitJsSdk.LitNodeClient();

  await client.connect();
  const encryptedSymmetricKey = await client.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
  });
  EncryptedFileData(encryptedFile);
  EncryptedSymmetricKeyData(
    LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
  );
  console.log("print success");

  return {
    encryptedFile,
    encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    ),
    accessControlConditions,
  };
}
