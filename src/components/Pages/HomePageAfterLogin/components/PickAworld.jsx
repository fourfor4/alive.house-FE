import React from "react";
import MarketPlaceCard from "../../MarketPlace/components/MarketPlaceCard";
import AfterLoginCategory from "./AfterLoginCategory";
import arrow from "../../../../assets/SongHomePage/arrow.png";
import useRouter from "../../../../hooks/useRouter";
import useNoAuth from "../../../../hooks/useNoAuth";
import { useState } from "react";
const PickAworld = () => {
  const router = useRouter();
  const { fetchData } = useNoAuth();
  const [trendings, setTrendings] = useState(null);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetchData();
    if (result) {
      setTrendings(result);
    }
  };

  const goToSongPage = (id) => {
    if (id) {
      router.push(`/songpage?id=${id}`);
    }
  };

  return (
    <div>
      <div className="h-[100vh] bg-white">
        <div className=" h-[100vh] flex flex-col justify-around items-center">
          <p
            style={{ fontFamily: "Nuform Sans" }}
            className="text-gray text-[84px] "
          >
            pick a world
          </p>
          <AfterLoginCategory light />
          <div
            className="flex gap-[7rem]"
            onClick={(e) => console.log(e.target.id)}
          >
            {trendings &&
              trendings?.length &&
              trendings.map((song, index) => (
                <MarketPlaceCard
                  key={index}
                  data={song}
                  status={index === 0 ? "i" : index === 1 ? "c" : "nr"}
                  func={goToSongPage}
                />
              ))}
            {/* <MarketPlaceCard status="i" />
            <MarketPlaceCard status="c" />
            <MarketPlaceCard status="nr" /> */}
          </div>
          <div>
            <div
              onClick={() => router.push("/marketplace")}
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[16px] text-gray flex justify-center mt-10 pb-[2rem] items-center gap-2 cursor-pointer"
            >
              see more
              <img src={arrow} className="h-[2.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickAworld;
