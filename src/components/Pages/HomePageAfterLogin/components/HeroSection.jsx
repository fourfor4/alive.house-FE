import React, { useEffect } from "react";
import NotifyContent from "../../HomeScreenPage/components/NotifyContent";
import bell from "../../../../assets/SongHomePage/Notification_Boxed.png";
import CarouselComponent from "./Carousel";
import { GetNotifedButton } from "../../HomeScreenPage/components/GetNotifedButton";
import { JoinThePartyButton } from "../../HomeScreenPage/components/JoinThePartyButton";
import Popup from "../../../../assets/comps/Popup/Popup";
import LaunchTimer from "../../../../assets/comps/LaunchTimer";
import useSongLaunch from "../../../../hooks/use-song-launch";
import LayloModal from "../../../../Modals/LayloModal";
import useRouter from "../../../../hooks/useRouter";

const HeroSection = () => {
  const { launchDataCopy } = useSongLaunch();
  const [clicked, setClicked] = React.useState(false);
  const [timeComplete, setTimeComplete] = React.useState(false);
  const [laylo, setLaylo] = React.useState(false);
  const router = useRouter();

  const goToSongPage = (id) => {
    // console.log({ id });
    if (id) {
      router.push(`/songpage?id=${id}`);
    }
  };

  return (
    <div>
      <div className="flex justify-around items-center alivebottomborder">
        <div className="flex flex-col ml-[2rem] mt-[5rem] ">
          <div className="w-[45rem]">
            <p
              style={{
                fontFamily: "Nuform Sans",
                color: "#242430",
                opacity: "0.25",
              }}
              className="text-[30px]"
            >
              upcoming drops
            </p>
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[120px] mt-[-3rem] text-green "
            >
              {launchDataCopy?.[0]?.title?.value}
            </p>
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[18px] w-[40rem] text-gray "
            >
              {launchDataCopy?.[0]?.description?.value}
            </p>
            {/* <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[24px] mt-[3rem] text-gray "
            >
              listening party begins
            </p> */}
          </div>
          <div className="scale-[0.85] ml-[-4rem] mt-[-3rem]">
            <div className="w-full h-10"></div>
            {/* <LaunchTimer
              launchTime={launchDataCopy?.[0]?.launchTime?.value}
              setBuyNowVisibility={() => {}}
            /> */}
          </div>
          <div className="mt-[0rem] mb-[5rem]">
            {/* {!timeComplete && (
              <GetNotifedButton clicked={clicked} setClicked={setClicked} />
            )}
            {timeComplete && (
              <JoinThePartyButton clicked={clicked} setClicked={setClicked} />
            )} */}
            <LayloModal show={laylo} setLaylo={setLaylo} />
            <div className="mt-[4rem] flex gap-[2rem]">
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
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-[2rem] items-center h-[calc(100vh-170px)]">
          {/* <CarouselComponent imgData={launchDataCopy?.[0]?.coverImage?.value} /> */}
          <img
            className="h-[55rem]"
            src={launchDataCopy?.[0]?.coverImage?.url?.value}
            alt="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
