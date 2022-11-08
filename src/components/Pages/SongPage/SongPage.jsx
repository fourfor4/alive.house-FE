import React from "react";

import Desc from "./components/Desc";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import ReactTooltip from "react-tooltip";
import Footer from "../HomeScreenPage/components/Footer";
import AnimatePage from "../../../assets/comps/AnimateComponent";
import { useHookstate, useState } from "@hookstate/core";
import { useEffect } from "react";
import useNoAuth from "../../../hooks/useNoAuth";
import useQuery from "../../../hooks/useQuery";
import Popup from "../../../assets/comps/Popup/Popup";
import useMarketplace from "../../../hooks/use-marketplace";
import { useUserprofile } from "../../../hooks/user-profile";
import useSongDetais from "../../../hooks/useSongDetais";
import PaymentCompletePopup from "./PaymentCompletePopup";

const SongPage = ({ data }) => {
  const { urlQuery, getUrlParams } = useQuery();
  const localData = useHookstate(data);
  const [disable, setDisable] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [pAddress, setPAddress] = React.useState("");
  const marketplace = useMarketplace();
  const userProfile = useUserprofile();
  const localUserData = useHookstate({});
  const { editions, fetchSongDetails, localCopy } = useSongDetais();

  React.useEffect(() => {
    if (userProfile?.value) {
      localUserData?.merge(userProfile?.value);
    }
  }, [userProfile?.value]);

  React.useEffect(() => {
    setEmail(localUserData?.data?.value?.email?.value);
    setPAddress(localUserData?.data?.value?.publicAddress?.value);
  }, [localUserData?.value]);

  React.useEffect(() => {
    getUrlParams("id");
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    marketplace.state.tiers.set(localCopy?.song_onboarding?.editions);
    setDisable(false);
    formatAndSendToUnity(localCopy, urlQuery);
  }, [editions]);

  useEffect(() => {
    if (urlQuery) {
      fetchSongDetails(urlQuery);
    }
  }, [urlQuery]);

  const formatAndSendToUnity = (data, id) => {
    let jsonString = {
      id: id,
      userId: localUserData?.data?.value?.id?.value,
      srt: "https://alive-cms-dev.s3.ap-south-1.amazonaws.com/Be_Okaycaptions_d4bc6ab34a.srt",
      mainSongLink: data?.song_onboarding?.audioFile?.url?.value || "",
      mainVideoLink: data?.song_onboarding?.albumArt?.coverVideo?.url?.value,
      stems: data?.song_onboarding?.stems?.value,
      btsAudios: [
        "https://cdn.alive.house/artist/esabalu/5_BE_OKAY_Chris_Jenn_Rhodes.mp3",
        "https://cdn.alive.house/artist/esabalu/3_Be_Okay_VJ_Jenn_Guitar.mp3",
        "https://cdn.alive.house/artist/esabalu/1_Lonely_Away_Jenn_Guitar_Vocal.mp3",
        "https://cdn.alive.house/artist/esabalu/2_Pain-Chris_and_Jenn.mp3",
      ],
      btsVideos: [
        "https://cdn.alive.house/artist/esabalu/4_Be_Okay_Live_Performance_optimised/dash/4_Be_Okay_Live_Performance_optimised.mpd",
      ],
    };
    localData.set(jsonString);
    return;
  };

  return (
    <AnimatePage>
      <div>
        {/* <PaymentCompletePopup/> */}
        <Hero data={localCopy} disable={disable} />
        {editions && editions.length && (
          <Experience
            editionData={localCopy}
            editions={editions}
            userPAddress={pAddress}
            userEmail={email}
          />
        )}
        <Desc data={localCopy} />
        <ReactTooltip place="right" className="customTheme" />
        <Footer dark />
      </div>
    </AnimatePage>
  );
};

export default SongPage;
