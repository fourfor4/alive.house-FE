module.exports = {
  name: "alive-game",
  script: "serve",
  env: {
    PM2_SERVE_PATH: "./dist",
    PM2_SERVE_PORT: 8000,
    RPC_URL_1: "https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f",
    RPC_URL_4: "https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f",
    RPC_URL_137: "https://polygon-rpc.com/",
  },
};
