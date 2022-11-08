import React, { useState } from "react";
import album from "../../../../assets/SongHomePage/albumCover.png";

import FlipNumbers from "react-flip-numbers";
import NotifyContent from "./NotifyContent";
import { GetNotifedButton } from "./GetNotifedButton";
import Laylo from "../../../../assets/comps/Laylo/Laylo";
import { AnimatePresence } from "framer-motion";
import Popup from "../../../../assets/comps/Popup/Popup";
import { JoinThePartyButton } from "./JoinThePartyButton";
import LaunchTimer from "../../../../assets/comps/LaunchTimer";
import LayloModal from "../../../../Modals/LayloModal";
import useSongLaunch from "../../../../hooks/use-song-launch";
import { useEffect } from "react";
import useRouter from "../../../../hooks/useRouter";
import SongSlider from './SongSlider';
const Notify = ({ source, noanimate }) => {
  const { launchDataCopy } = useSongLaunch();
  const [laylo, setLaylo] = useState(false);
  const router = useRouter();

  const goToSongPage = (id) => {
    // console.log({ id });
    if (id) {
      router.push(`/songpage?id=${id}`);
    }
  };

  return (
    <div className="h-screen bg-white relative">
      {launchDataCopy?.value && <div className="flex items-center justify-center h-full">
        <SongSlider>
      <div className=" ">
        <div className="flex items-start gap-[15rem] justify-center">
          <img src={launchDataCopy?.[0]?.coverImage?.url?.value} alt={'song image'} className='h-[55rem]' />
          <div className="flex items-start flex-col mt-6">
            <div
              className="text-[32px]"
              style={{
                fontFamily: "Nuform Sans",
                fontWeight: "900",
                color: "rgba(36, 36, 48, 0.25)",
              }}
            >
              upcoming drop
            </div>
            <div
              className="text-[124px] mt-[-4rem] text-red"
              style={{
                fontFamily: "Nuform Sans",
                fontWeight: "900",
                // color: "#ff665c",
              }}
            >
              {launchDataCopy?.[0]?.title?.value?.toLowerCase()}
            </div>
            <div
              className="text-[48px] mt-[-4rem] text-gray"
              style={{
                fontFamily: "Nuform Sans",
                fontWeight: "900",
                // color: "#242430",
              }}
            >
              {launchDataCopy?.[0]?.artistName?.value?.toLowerCase()}
            </div>
            <div className="my-[2rem]">
              {/* <LaunchTimer
                launchTime={launchDataCopy?.[0]?.launchTime?.value}
                setBuyNowVisibility={() => {}}
              /> */}
            </div>
            <div className="flex mt-[4rem] items-center justify-start gap-[2rem] w-[60rem]">
              <LayloModal show={laylo} setLaylo={setLaylo} />
              {/* <GetNotifedButton setLaylo={setLaylo} /> */}
              <button className="flex h-[6rem] ">
                <div
                  style={{
                    fontFamily: "Nuform Sans",
                    fontWeight: "900",
                  }}
                  onClick={() => goToSongPage(launchDataCopy?.[0]?.id?.value)}
                  className="w-[180px] text-[25px] border border-gray  text-gray bg-white h-[6rem] flex items-center justify-center"
                >
                  view song
                </div>
              </button>
              {/* {!timeComplete && (
                <GetNotifedButton clicked={clicked} setClicked={setClicked} />
              )}
              {timeComplete && <JoinThePartyButton />}
              {!timeComplete && (
                <button className="flex h-[6rem] mt-[2rem]">
                  <div
                    style={{
                      fontFamily: "Nuform Sans",
                      fontWeight: "900",
                    }}
                    className="w-[180px] text-[25px] border border-gray  text-gray bg-white h-[6rem] flex items-center justify-center"
                  >
                    view song
                  </div>
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>

      </SongSlider>
        </div>}
    </div>
  );
};

export default Notify;
{
  /* <GetNotifedButton clicked={clicked} setClicked={setClicked} /> */
}
