import "./index.scss";
import { motion } from "framer-motion";
import thumbnail from "./Images/thumbnail.svg";
import bell from "./Images/bell.svg";
import arrow from "./Images/arrow.svg";
import close from "./Images/close.svg";
import React, { useEffect, useState } from "react";
import NotifyContent from "./NotifyContent/NotifyContent";
import moment from "moment";
import useSubscriber from "../../hooks/useSubscriber";

const CountDown = ({ timeEnd, setEventStarted }) => {
  const today = moment();
  const deadline = moment(timeEnd, "YYYY-MM-DD", true);

  const milliseconds = deadline.diff(moment(), "milliseconds");
  const days = moment.duration(milliseconds).days();
  const hours = moment.duration(milliseconds).hours();
  const minutes = moment.duration(milliseconds).minutes();
  const seconds = moment.duration(milliseconds).seconds();
  const [time, setTime] = useState([days, hours, minutes, seconds]); //remove sec

  useEffect(() => {
    const timer = setInterval(() => {
      const milliseconds = deadline.diff(moment(), "milliseconds");
      const days = moment.duration(milliseconds).days();
      const hours = moment.duration(milliseconds).hours();
      const minutes = moment.duration(milliseconds).minutes();
      const seconds = moment.duration(milliseconds).seconds();
      setTime([days, hours, minutes, seconds]); //remove sec
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (deadline.isBefore(today)) {
    setEventStarted(true);
    return (
      <h2 style={{ fontSize: "40px", color: "#ff665c" }}>event started</h2>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        width: "350px",
        height: "87px",
        marginTop: "3rem",
      }}
    >
      {time[0] != 0 && <NotifyContent digit={time[0]} unit="days" />}
      <NotifyContent digit={time[1]} unit="hours" />
      <NotifyContent digit={time[2]} unit="minutes" />
      {time[0] == 0 && <NotifyContent digit={time[3]} unit="seconds" />}
    </div>
  );
};

const Popup = ({ setShowLayloBox }) => {
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [eventStarted, setEventStarted] = useState(true);
  const [error, setError] = useState("");
  const subscriber = useSubscriber();
  const [email, setEmail] = useState("");
  const Time = "Thu Aug 19 12:00:00 PDT+0530 2022";
  const timeStart = moment(moment().format("YYYY-MM-DD"));
  const timeEnd = moment(moment(Time).format("YYYY-MM-DD"));
  const time1 = moment(Time).format("HH:mm:ss");
  const time2 = moment().format("HH:mm:ss");
  const timeDifferDays = timeEnd.diff(timeStart, "days");
  const time1spilit = time1.split(":");
  const time2spilit = time2.split(":");
  const hoursDiff = time1spilit[0] - time2spilit[0];
  const minDiff = time1spilit[1] - time2spilit[1];
  const secDiff = time1spilit[2] - time2spilit[2];

  const lauchTime = moment()
    .add(timeDifferDays, "days")
    .add(hoursDiff, "hours")
    .add(minDiff, "minutes")
    .add(secDiff, "seconds");

  const validateEmail = (email) => {
    const filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const submit = () => {
    setError("");
    if (validateEmail(email)) {
      setShowEmailBox(false);
      subscriber.put({
        data: {
          songLaunchId: 1,
          email,
        },
      });
    } else {
      setError("Please provide a valid email address");
    }
  };

  return (
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      className="popup_container"
      onClick={() => setShowLayloBox(false)}
    >
      <div className="inner_div one"></div>
      <div className="inner_div two">
        <div className="layloBox" onClick={(e) => e.stopPropagation()}>
          <div className="close_button" onClick={() => setShowLayloBox(false)}>
            <img src={close} alt="close-button" />
          </div>
          <div className="thumbnail">
            <img src={thumbnail} alt="thumbnail" />
          </div>
          <div className="info">
            <div className="title">
              <h1>be okay</h1>
              <h2>esabalu</h2>
            </div>
            <p>
              Be Okay is one of 6 tracks from Esabalu's debut EP "Moon" released
              just a few months ago in April 2022. Experience the world of this
              song, with access to a stem player and witness the evolution of
              the track across 6 different versions of the song from the first
              draft to the version you hear now!
            </p>
            <h3>launch party starts in</h3>
            <CountDown timeEnd={lauchTime} setEventStarted={setEventStarted} />
            <div>
              {showEmailBox && <p style={{ color: "red" }}>{error}</p>}
              {showEmailBox ? (
                <div className="email_box">
                  <div className="input_container">
                    <p>enter email ID to get notified</p>
                    <input
                      type="email"
                      name="email"
                      className="input_email"
                      placeholder="enter email ID"
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          submit();
                        }
                      }}
                    />
                  </div>
                  <div
                    className="button_container"
                    onClick={() => setShowEmailBox(false)}
                  >
                    <div className="arrow_box" onClick={submit}>
                      <img src={arrow} alt="arrow" />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="get_notified"
                  onClick={() => setShowEmailBox(true)}
                >
                  <div className="bell_div">
                    <img src={bell} alt="bell" />
                  </div>
                  <div className="yellow_box">get notified</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Popup;
