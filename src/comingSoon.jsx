import React from "react";
import ReactDOM from "react-dom";
import logo from "./assets/Home/Images/blackLogo.svg";

window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FF665C",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "12%",
          height: "9%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={logo}
          alt="logo"
        />
      </div>
      <h1 style={{ color: "#fff", marginTop: "2rem", fontSize: "2.5rem" }}>
        Coming Soon...
      </h1>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
