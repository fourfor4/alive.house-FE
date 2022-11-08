import "./main.scss";
// import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom";
// import { Web3ReactProvider } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";
import "./index.scss";
import App from "./components/App";

window.React = React;

ReactDOM.render(
  <div className="bg-white">
    <App />
  </div>,
  document.getElementById("root")
);
