import { Magic } from "magic-sdk";

export const getNodeOptions = () => {
  const customNodeOptions = {
    rpcUrl: "https://rpc-mainnet.maticvigil.com/", // Polygon RPC URL
    chainId: 80001, // Polygon chain id
  };
  const magic = new Magic(import.meta.env.VITE_MAGIC_API_KEY, {
    network: customNodeOptions,
  });
  return magic;
};
