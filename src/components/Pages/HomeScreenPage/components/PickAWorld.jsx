import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongCard from "./SongCard";

import arrow from "../../../../assets/SongHomePage/arrow.png";

import Category from "./Category";

import ErrorModal from "../../../../Modals/ErrorModal";
import { changePage } from "../../../../globalStates/Home";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import useNoAuth from "../../../../hooks/useNoAuth";

const PickAWorld = () => {
  const navigate = useNavigate();
  const { fetchDataByQuery } = useNoAuth();
  const [songs, setSongs] = React.useState(null);
  const { _t } = useAnalytics();

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetchDataByQuery();

    if (result) {
      // console.log({ result });
      setSongs(result);
    }
  };

  const goToMarketplace = () => {
    _t("SUCCESS:MARKETPLACE:PAGE");
    navigate("/marketplace");
  };

  return (
    <>
      <ErrorModal />
      <div
        className="min-h-screen bg-gray"
        style={{ fontFamily: "Nuform Sans", fontWeight: "900" }}
        onClick={getData}
      >
        <div className="">
          <h1
            className="text-[110px] text-center pt-5"
            style={{ color: "#ff665c" }}
          >
            pick a world
          </h1>
          <div className="flex justify-center gap-16 ">
            <Category />
          </div>
        </div>
        <div className="flex justify-center mt-[6rem]">
          <div className="flex gap-24">
            {songs?.length &&
              songs.map((song, index) => {
                return <SongCard key={index} song={song} />;
              })}
          </div>
        </div>
        <div>
          <div
            className="text-[16px] text-white flex justify-center mt-10 pb-[2rem] items-center gap-2 cursor-pointer"
            onClick={goToMarketplace}
          >
            see more
            <img src={arrow} className="h-[2.5rem]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PickAWorld;
