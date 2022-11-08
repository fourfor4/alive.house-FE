import { InjectedConnector } from "@web3-react/injected-connector";
import { MagicConnector } from "@web3-react/magic-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { useEffect } from "react";

const POLLING_INTERVAL = 12000;
// const RPC_URLS: { [chainId: number]: string } = {
const RPC_URLS = {
  //   1: process.env.RPC_URL_1 as string,
  //   4: process.env.RPC_URL_4 as string
  137: import.meta.env.RPC_URL_137,
};

export const injected = new InjectedConnector({ supportedChainIds: [137] });
// export const network = new NetworkConnector({
//   // urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
//   urls: { 137: RPC_URLS[137] },
//   defaultChainId: 137,
// });

// export const MagicFunc = async () => {
//   const magic = new MagicConnector({
//     apiKey: import.meta.env.VITE_MAGIC_API_KEY,
//     chainId: 4,
//     email: await Connectors(),
//   });
//   return magic;
// };
