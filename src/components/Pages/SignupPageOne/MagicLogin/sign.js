import { ethers } from "ethers";
import { getNodeOptions } from "./nodeOptions";

export const sign = async (originalMessage) => {
  const magic = getNodeOptions();
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  const signer = provider.getSigner();

  // const originalMessage = "YOUR_MESSAGE";

  const signedMessage = await signer.signMessage(originalMessage);
  return signedMessage;
};
