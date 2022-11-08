import React from "react";
import albumPhoto from "../../../../assets/SongHomePage/albumPhoto.svg";
import Twitter from "../../../../assets/SongHomePage/socials/Light/Twitter.svg";
import Facebook from "../../../../assets/SongHomePage/socials/Light/Facebook.svg";
import Spotify from "../../../../public/Images/Spotify.svg";
import Youtube from "../../../../public/Images/Youtube.svg";
import Instagram from "../../../../assets/SongHomePage/socials/Light/Instagram.svg";
import useSongDetais from "../../../../hooks/useSongDetais";
import { useEffect } from "react";
import { useArtistProfile } from "../../../../hooks/use-artist";
import useQuery from "../../../../hooks/useQuery";

const HeroSection = () => {
  const artistProfile = useArtistProfile();
  const { urlQuery, getUrlParams } = useQuery();

  useEffect(() => {
    getUrlParams("id");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (urlQuery) {
      artistProfile.fetchMe(urlQuery);
    }
  }, [urlQuery]);

  // useEffect(() => {
  //   console.log({
  //     artistprofile:
  //       artistProfile?.value?.data?.song_onboarding?.[0]?.primaryArtists?.[0]
  //         ?.name?.value,
  //   });
  // }, [artistProfile?.value]);

  return (
    <div className="h-[100vh] bg-gray alivebottomborder mb-[4.7rem]">
      <div>
        <div className="flex items-center gap-[10rem] justify-center h-[100vh] w-[100vw]">
          <div className="relative">
            <img
              className="h-[55rem]"
              src={artistProfile?.value?.data?.profileImage?.url?.value}
            />
            {/* <div className="albumcardafter1 bg-green border-l border-gray absolute top-[0] right-[-20px]"></div>
            <div className="albumcardafter2 bg-white border-t border-g   absolute bottom-[-20px] left-[0]"></div> */}
          </div>
          <div className="flex flex-col gap-[2rem] w-[50%]">
            <p
              className="text-red text-[100px]"
              style={{ fontFamily: "Nuform Sans" }}
            >
              {
                artistProfile?.value?.data?.song_onboarding?.[0]
                  ?.primaryArtists?.[0]?.name?.value
              }
            </p>
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className=" text-white text-[20px]"
            >
              {artistProfile?.value?.data?.bandBio?.value}
            </p>
            <div className="flex gap-[4rem]">
              <button
                style={{ fontFamily: "Nuform Sans" }}
                className="h-fit w-fit bg-white text-[20px] px-5 py-2 cursor-default"
              >
                {artistProfile?.value?.data?.bandTags?.value}
              </button>
            </div>
            <div className="flex gap-[4rem] mt-[3rem]">
              <a href="https://www.instagram.com/esabalumusic/" target="_blank">
                <img
                  className="h-[3rem]"
                  src={Instagram}
                  alt="instagram-icon"
                />
              </a>
              <a href="https://twitter.com/esabalumusic" target="_blank">
                <img className="h-[3rem]" src={Twitter} alt="twitter-icon" />
              </a>
              <a
                href="https://open.spotify.com/artist/4KvgJF4TQQ3T4ZRBbdLoDg?si=W8IXcITVQYOsMZOsPIAfYw"
                target="_blank"
              >
                <img className="h-[3rem]" src={Spotify} alt="spotify-icon" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCjIP9IRR1K5VTzdVc73w-9g/videos"
                target="_blank"
              >
                <img className="h-[3rem]" src={Youtube} alt="youtube-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
