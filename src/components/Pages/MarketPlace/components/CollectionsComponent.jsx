import React from "react";
import MarketPlaceCard from "./MarketPlaceCard";
import slideright from "../../../../assets/SongHomePage/slideArrorRight.svg";
import slideleft from "../../../../assets/SongHomePage/slideArrowLeft.svg";
import arrow from "../../../../assets/SongHomePage/arrow.png";
import Slider from "react-slick";

const CollectionsComponent = ({ title }) => {
  const [open, setOpen] = React.useState(false);
  const [cards, setCards] = React.useState([
    { id: 1, status: "i" },
    { id: 2, status: "n" },
    { id: 3, status: "c" },
    { id: 4, status: "i" },
    { id: 5, status: "n" },
    { id: 6, status: "c" },
    { id: 7, status: "i" },
    { id: 8, status: "n" },
    { id: 9, status: "c" },
  ]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <img src={slideright} className="w-[60px] h-[60px]" />,
    prevArrow: <img src={slideleft} className="w-[60px] h-[60px]" />,
  };
  return (
    <div className="hal">
      <div
        className={`flex transition-all items-center flex-col ${
          title === "songs" ? "pt-[9rem]" : "pt-[5rem]"
        } pb-[5rem] border-b border-gray `}
      >
        <p
          style={{ fontFamily: "Nuform Sans" }}
          className="text-[58px] text-gray mb-[2rem]"
        >
          {title}
        </p>
        <div className="flex justify-around gap-[4rem]">
          {open === false && (
            <Slider {...settings}>
              {cards.map((e, index) => {
                return <MarketPlaceCard key={index} status={e.status} />;
              })}
            </Slider>
          )}

          {open === true && (
            <div className="w-[100vw] flex justify-center">
              <div className="w-[80vw] flex gap-[12rem] flex-wrap">
                {cards.map((e, index) => {
                  return <MarketPlaceCard key={index} status={e.status} />;
                })}
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="z-[100] flex gap-[2rem] items-center mt-[6rem]"
        >
          <p
            style={{ fontFamily: "Nuform Sans" }}
            className="text-[20px] text-gray"
          >
            {open ? "hide all" : "see all"}
          </p>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default CollectionsComponent;
