import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Container from "./Container";

// const page = useMobileViewPageInfo().get();

window.React = React;

ReactDOM.render(
  <React.StrictMode>
    <div className="mobileView_container">
      <Container />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
