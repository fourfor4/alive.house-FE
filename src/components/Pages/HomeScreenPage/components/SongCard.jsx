import React from "react";
import { useNavigate } from "react-router-dom";
import songcard from "../../../../assets/SongHomePage/songcard.svg";
import placeholderImg from "../../../../public/Images/placeholder.png";
import CardRec from "../../../../assets/SongHomePage/CardRec.svg";
import player from "../../../../assets/SongHomePage/player.svg";
import Marquee from "react-fast-marquee";
import { memo } from "react";
import useRouter from "../../../../hooks/useRouter";

const SongCard = ({ song }) => {
  const router = useRouter();
  const [isHover, setIsHover] = React.useState(false);
  let songTitle;

  if (song?.song_onboarding?.title?.length > 15) {
    songTitle = song?.song_onboarding?.title?.substring(0, 10) + "...";
  } else {
    songTitle = song?.song_onboarding?.title;
  }

  return (
    <div
      className={`${
        isHover ? "scale-[1.02]" : "scale-[1]"
      } transition-all duration-300`}
    >
      <div
        onClick={() => {
          router.push(`/songpage?id=${song?.id}`);
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        data-aos="fade-up"
        className={`h-[40rem] relative bg-white w-[30rem] transition-all gap-[1rem] flex flex-col items-center`}
      >
        <div
          className={`${
            isHover ? "opacity-100" : "opacity-0"
          } transition-all duration-300`}
        >
          <div className="homepagecardafter1 absolute right-[-10px] bottom-[10] border-l border-gray bg-green"></div>
          <div className="homepagecardafter2holder bottom-[-10px] left-[0] absolute">
            <div className="homepagecardafter2  bg-white"></div>
          </div>
        </div>

        <div className="w-96 h-96 border rounded-full overflow-hidden grid place-items-center">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.alive.house/artist/esabalu/EsaforWeb.gif"
            // className="my-[0.5rem] w-[70%] border border-gray rounded-full"
          />
        </div>
        <img src={player} className="w-[24rem] " />
        <div className=" flex justify-center flex-col items-center ">
          {!isHover && (
            <p
              className=" text-[38px] "
              style={{
                fontFamily: "Nuform Sans",
                fontWeight: "900",
                color: "#ff665c",
              }}
            >
              {song?.song_onboarding?.title
                ? songTitle?.toLowerCase()
                : "Song Name"}{" "}
            </p>
          )}
          {isHover &&
            song?.song_onboarding?.title &&
            song?.song_onboarding?.title?.length < 15 && (
              <p
                className=" text-[38px] text-red"
                style={{
                  fontFamily: "Nuform Sans",
                  fontWeight: "900",
                  color: "#ff665c",
                }}
              >
                {song?.song_onboarding?.title
                  ? songTitle?.toLowerCase()
                  : "Song Name"}{" "}
              </p>
            )}
          {isHover &&
            song?.song_onboarding?.title &&
            song?.song_onboarding?.title?.length > 15 && (
              <>
                <div className="w-[19rem]">
                  <Marquee gradient={false}>
                    <p
                      className=" text-[38px] "
                      style={{
                        fontFamily: "Nuform Sans",
                        fontWeight: "900",
                        color: "#ff665c",
                      }}
                    >
                      {song?.song_onboarding?.title
                        ? song?.song_onboarding?.title.toLowerCase()
                        : "Song Name"}{" "}
                    </p>
                    <div className="w-[1rem]"></div>
                  </Marquee>
                </div>
              </>
            )}
          <p
            className=" text-[24px] mt-[-1rem]"
            style={{
              fontFamily: "Nuform Sans",
              fontWeight: "900",
              color: "#242430",
            }}
          >
            {song?.song_onboarding?.primaryArtists[0]?.name?.toLowerCase() ||
              "artist"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(SongCard);
