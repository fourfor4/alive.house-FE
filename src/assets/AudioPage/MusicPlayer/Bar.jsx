import React, { useEffect, useState } from "react";
import moment from "moment";
import "./index.scss";
import JumpFront from "../Images/jumpAhead.svg";
import JumpBack from "../Images/jumpBehind.svg";
import Pause from "../Images/pause.svg";
import Play from "../Images/play.png";
import { useDispatch } from "react-redux";
import {
  jumpSongBack,
  jumpSongForth,
  playSong,
} from "../../../redux/actions/AudioPage";

export default function Bar(props) {
  const dispatch = useDispatch();
  const { duration, curTime, onTimeUpdate } = props;
  const [songPlay, setSongPlay] = useState(false);
  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment
      .utc(moment.duration(duration, "seconds").asMilliseconds())
      .format("mm:ss");
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  useEffect(() => {
    dispatch(playSong(songPlay));
  }, [songPlay]);

  const handleSkipForward = () => {
    dispatch(jumpSongForth(true));
    setTimeout(() => {
      dispatch(jumpSongForth(false));
    }, 0);
  };

  const handleSkipBackward = () => {
    dispatch(jumpSongBack(true));
    setTimeout(() => {
      dispatch(jumpSongBack(false));
    }, 0);
  };

  return (
    <div className="music_player_bar">
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, #ff5b45 ${curPercentage}%, #000 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <div className="controls">
        <span className="bar__time">{formatDuration(curTime)}</span>
        <span className="bar__time">{formatDuration(duration)}</span>
      </div>
      <div className="playble_controls_musicplayer">
        <div
          className="musicplayer_control_container"
          onClick={() => handleSkipBackward()}
        >
          <img src={JumpBack} alt="jumpback" />
        </div>
        <div
          className="musicplayer_control_container play_pause"
          onClick={() => setSongPlay(!songPlay)}
        >
          {songPlay ? (
            <img src={Pause} alt="jumpback" />
          ) : (
            <img src={Play} alt="jumpback" />
          )}
        </div>
        <div
          className="musicplayer_control_container"
          onClick={() => handleSkipForward()}
        >
          <img src={JumpFront} alt="jumpback" />
        </div>
      </div>
    </div>
  );
}
