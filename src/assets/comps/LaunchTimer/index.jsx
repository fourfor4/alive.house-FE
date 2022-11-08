import React, { useEffect, useState } from "react";
import NotifyContent from "./NotifyContent";
import moment from "moment";
import { chnageButtonAction } from "../../../globalStates/Home";

const CountDown = ({ timeEnd, setEventStarted, setBuyNowVisibility }) => {
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
    setBuyNowVisibility(true);
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

const LaunchTimer = ({ launchTime, setBuyNowVisibility, extraSecs = 0 }) => {
  const [eventStarted, setEventStarted] = useState(true);
  const Time = launchTime;
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
    // .add(12, "hours")
    .add(minDiff, "minutes")
    .add(secDiff, "seconds")
    .add(extraSecs, "seconds");

  return (
    <CountDown
      timeEnd={lauchTime}
      setEventStarted={setEventStarted}
      setBuyNowVisibility={setBuyNowVisibility}
    />
  );
};

export default LaunchTimer;
