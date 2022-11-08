import "./index.scss";
import Bar from "../MusicPlayer/Bar";
import useAudioPlayer from "../MusicPlayer/useAudioPlayer";
import KandisaSong from "./Kandisa.mp3";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Musicplayer({ playSong, skipForward, skipBackward }) {
  const { curTime, duration, playing, setPlaying, setClickedTime } =
    useAudioPlayer();
  const [skip, setSkip] = useState(null);

  useEffect(() => {
    if (playSong) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [playSong]);

  useEffect(() => {
    if (skipForward) {
      setSkip("forward");
    } else if (skipBackward) {
      setSkip("backward");
    } else {
      setSkip(null);
    }
  }, [skipForward, skipBackward]);

  return (
    <div className="player">
      <audio id="audio" data-set={skip} loop={false}>
        <source src="https://cdn.alive.house/artist/huyana/is-it-you/ogg/Huyana-IsItYou.ogg" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className="musicplayer_bar">
        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}
        />
      </div>
    </div>
  );
}

function mapStateToProps({ AudioPageReducer }) {
  return {
    playSong: AudioPageReducer.songPlaying,
    skipForward: AudioPageReducer.jumpForth,
    skipBackward: AudioPageReducer.jumpBack,
  };
}

export default connect(mapStateToProps)(Musicplayer);
