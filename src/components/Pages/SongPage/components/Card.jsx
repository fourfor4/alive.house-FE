import React from "react";
import songcard from "../../../../assets/SongHomePage/songcard2.svg";
import placeholderImg from "../../../../public/Images/placeholder.png";
import wheel from "../../../../assets/SongHomePage/wheel.svg";

const Card = ({ data, isPlaying, duration }) => {
  const [timer, setTimer] = React.useState(0);
  const countRef = React.useRef(null);

  React.useEffect(() => {
    if (isPlaying) {
      countRef.current = setInterval(() => {
        if (timer < duration+1) {
          setTimer((timer) => timer + 0.0625);
        }
      }, 62.5);
    }
  }, [isPlaying]);

  React.useEffect(() => {
    if (timer > duration) {
      setTimer(0);
    }
  }, [timer]);

  return (
    <div className=" relative w-[30rem] h-[38rem] flex mb-[1rem]  flex-col gap-[0.5rem] items-center jusitfy-center border border-gray bg-white">
      <div className="songpagecardafter1 absolute right-[-10px] border-r top-[0] border-l border-gray bg-green"></div>
      <div className="songpagesidebarcardafter2holder flex items-center justify-center bottom-[-10px] left-[-1px] absolute">
        <div className="songpagesidebarcardafter2  bg-white"></div>
      </div>

      <img
        src={
          data?.song_onboarding?.albumArt?.coverImage?.url?.value ||
          placeholderImg
        }
        className="rounded-full mt-[1.5rem] w-[20rem] "
      />
      <div className="flex gap-[1rem] justify-center items-center ">
        <img src={wheel} className="  spinwheel  h-[3.5rem]" />

        <div className="w-[18rem] h-[3px] bg-gray ">
          <div className="flex">
            <div
              style={{ width: `${(timer / duration) * 6}rem` }}
              className={` h-[3px] bg-[#FF665C] `}
            ></div>
            <div
              style={{ width: `${(timer / duration) * 6}rem` }}
              className={` h-[3px] bg-yellow `}
            ></div>
            <div
              style={{ width: `${(timer / duration) * 6}rem` }}
              className={` h-[3px] bg-green `}
            ></div>
          </div>
        </div>
        <img src={wheel} className="  spinwheel h-[3.5rem]" />
      </div>
      <div className="  flex flex-col justify-center align-center left-[3.5rem]">
        <p
          className="text-[#FF665C] text-[42px] text-center"
          style={{ fontFamily: "Nuform Sans" }}
        >
          {data?.song_onboarding?.title?.value}
        </p>
        <p
          className="text-gray text-[26px] mt-[-1rem] text-center"
          style={{ fontFamily: "Nuform Sans" }}
        >
          {data?.song_onboarding?.primaryArtists?.[0]?.name?.value}
        </p>
      </div>
    </div>
  );
};

export default Card;
