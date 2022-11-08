import React from "react";
import LibraryCard from "./LibraryCard";
import slideArrowLeft from "../../../../assets/SongHomePage/slideArrowLeft.svg";
import slideArrowRight from "../../../../assets/SongHomePage/slideArrorRight.svg";
import arrow from "../../../../assets/SongHomePage/arrow.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LibrarySection = ({ color, text }) => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <img src={slideArrowRight} className="w-[60px] h-[60px]" />,
    prevArrow: <img src={slideArrowLeft} className="w-[60px] h-[60px]" />,
  };

  return (
    <div
      className={`border ${color === "g" && "bg-green"} doc ${
        color === "y" && "bg-yellow"
      } ${
        color === "r" && "bg-red"
      } transition-all duration-500 border-gray min-h-[65vh] ${
        open && "pt-[10rem]"
      } flex flex-col items-start justify-center `}
    >
      <div className="w-[100vw] flex justify-center">
        <div className="w-[87vw] flex justify-between">
          <p
            style={{ fontFamily: "Nuform Sans" }}
            className=" text-[32px] text-gray"
          >
            {" "}
            {text}
          </p>
          <div onClick={() => setOpen(!open)}>
            <div
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[24px] text-gray flex justify-center items-center gap-[1rem]"
            >
              {open ? "hide" : "see all"}
              <img
                src={arrow}
                className={`${
                  open && "rotate-90"
                } transition-all duration-700 h-[2.5rem] mt-[5px]`}
              />
            </div>
          </div>
        </div>
      </div>
      {!open && (
        <>
          <div className="w-[100vw] mt-[2rem] ">
            <div className=" flex items-center justify-center">
              <Slider {...settings}>
                {items.map((e, i) => {
                  return <LibraryCard status="y" key={i} id={e} />;
                })}
              </Slider>
            </div>
          </div>
        </>
      )}
      {open && (
        <>
          <div className="w-[100vw] my-[4rem] flex justify-center">
            <div className="w-[80vw] flex items-center justify-center gap-[6rem] flex-wrap">
              {items.map((item, i) => {
                return <LibraryCard key={i} status="y" />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Library = () => {
  return (
    <div>
      <div className="bg-white h-[35vh] flex justify-center items-center">
        <p
          style={{ fontFamily: "Nuform Sans" }}
          className="text-[64px] text-gray "
        >
          library
        </p>
      </div>
      <LibrarySection color="g" text="character effects" />
      <LibrarySection color="y" text="environment effects" />
      <LibrarySection color="r" text="sound effects" />
    </div>
  );
};

export default Library;
