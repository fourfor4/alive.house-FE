import React from "react";

import search from "../../../../assets/SongHomePage/Search_Stroke.png";
import albumart from "../../../../assets/SongHomePage/marketalbum.svg";
import slideleft from "../../../../assets/SongHomePage/slideArrowLeft.svg";
import slideright from "../../../../assets/SongHomePage/slideArrorRight.svg";
import MarketPlaceCard from "../components/MarketPlaceCard";
import Category from "../../HomeScreenPage/components/Category";
import Notify from "../../HomeScreenPage/components/Notify";
import Nav from "../../HomeScreenPage/components/Nav";
import Footer from "../../HomeScreenPage/components/Footer";
import CollectionsComponent from "../components/CollectionsComponent";
import useNoAuth from "../../../../hooks/useNoAuth";
import { setErrorMessage } from "../../../../hooks/useErrors";
import useRouter from "../../../../hooks/useRouter";
import PickAworld from "../../HomePageAfterLogin/components/PickAworld";

const Marketplace = () => {
  const [cards, setCards] = React.useState([]);
  const { fetchData } = useNoAuth();
  const router = useRouter();
  const [activeState, setActiveState] = React.useState([
    {
      id: 1,
      name: "new music",
      active: true,
      color: "bg-green",
      text: "text-green",
    },
    {
      id: 2,
      name: "trending",
      active: false,
      color: "bg-red",
      text: "text-red",
    },
    {
      id: 3,
      name: "collections",
      active: false,
      color: "bg-yellow",
      text: "text-yellow",
    },
  ]);

  const [active, setActive] = React.useState({
    name: "new music",
    active: true,
    color: "bg-green",
    text: "text-green",
  });

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await fetchData();
      if (result) {
        setCards(result);
      }
    } catch (err) {
      setErrorMessage({
        title: "Something went wrong",
        message: err.message,
      });
    }
  };
  const goToSongPage = (id) => {
    if (id) {
      router.push(`/songpage?id=${id}`);
    }
  };

  const handleCustomClick = (id) => {
    setActiveState(
      activeState.map((item) => {
        if (item.id === id) {
          item.active = true;
          setActive(item);
        } else {
          item.active = false;
        }
        return item;
      })
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Nav />
      <div>
        <div
          className={`transition-all duration-300 min-h-[25rem] ${active.color} flex justify-center items-end`}
        >
          <p
            style={{ fontFamily: "Nuform Sans", fontSize: "110px" }}
            className="text-gray mb-[2.5rem]"
          >
            {active.name}
          </p>
        </div>
        <div className="min-h-[20rem] alivebottomborder bg-white flex flex-col items-center justify-around ">
          <div className="bg-white">
            <Category
              light
              customClick={handleCustomClick}
              activeColor={active.text}
            />
          </div>
          <div className="flex gap-[2.5rem] items-center">
            <img src={search} className="h-[3.5rem]" />
            <input
              style={{ fontFamily: "Nuform Sans" }}
              type="text"
              placeholder="search for an artist or song"
              className=" w-[45vw] px-[2rem] h-[54px] bg-white border border-gray text-gray text-[16px]"
            />
          </div>
        </div>
      </div>
      <Notify source={albumart} noanimate />
      <PickAworld />
      <Footer dark />
    </div>
  );
};

export default Marketplace;
// {active.name !== "collections" && (
//   <div>
//     <div className="flex justify-center pb-[10rem] pt-10">
//       <div className="flex justify-between w-[80%]">
//         {cards &&
//           cards?.length &&
//           cards?.map((card, index) => (
//             <MarketPlaceCard
//               data={card}
//               status={index % 2 == 0 ? "i" : "c"}
//               func={goToSongPage}
//             />
//           ))}
//       </div>
//     </div>
//     {/* <div className="flex justify-center pb-[10rem]">
//       <div className="flex justify-between w-[80%]">
//         {cards &&
//           cards?.length &&
//           cards?.map((card, index) => (
//             <MarketPlaceCard status={index % 2 == 0 ? "i" : "c"} />
//           ))}
//       </div>
//     </div> */}
//   </div>
// )}
// {active.name === "collections" && (
//   <div className="my-36">
//     {cards &&
//       cards?.length &&
//       cards?.map((card, index) => (
//         <MarketPlaceCard
//           data={card}
//           status={index % 2 == 0 ? "i" : "c"}
//           func={goToSongPage}
//         />
//       ))}
//   </div>
// )}
