import { browserName } from "react-device-detect";

import "./index.scss";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Logo from "../../../public/Images/betalogo.png";

function LinearProgressWithLabel(props) {
  return (
    <Box>
      <Box width="100%" color="inherit">
        <LinearProgress variant="determinate" {...props} color="primary" />
      </Box>
      <Box minWidth={35}></Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function LinearWithValueLabel({ progression }) {
  const [backcolor, setBackColor] = useState("#FF6D63");
  const [bar, setBar] = useState(0);
  const [showSwitchBrowserText, setSwicthBrowserText] = useState(false);
  const classes = useStyles();

  const colorList = ["#FF6D63", "#53E1AD", "#FBD200"];

  function changeBackColor(color) {
    setBackColor(color);
    return;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const index = colorList.indexOf(
        colorList.find((color) => color === backcolor)
      );
      if (index < 2) {
        changeBackColor(colorList[index + 1]);
      } else {
        changeBackColor(colorList[0]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [backcolor]);

  useEffect(() => {
    setBar(Math.floor(progression * 100));
  }, [progression]);

  useEffect(() => {
    if (browserName === "Chrome" || browserName === "FireFox") {
      setSwicthBrowserText(false);
    } else {
      setSwicthBrowserText(true);
    }
  }, []);

  return (
    <div className="Loading_screen" style={{ backgroundColor: backcolor }}>
      <div className="loading_screen_logo_container_div">
        <div className="loading_screen_logo_container">
          <img src={Logo} alt="logo" />
        </div>
        <h1>every song is a world.</h1>
      </div>
      <div className="loading_screen_progress_bar_container">
        <div className={classes.root}>
          <LinearProgressWithLabel value={bar} />
        </div>
      </div>
      {showSwitchBrowserText && (
        <h1>
          Please switch to another browser if you are using Safari. a.live is
          optimised for Chrome & Firefox.
        </h1>
      )}
    </div>
  );
}
