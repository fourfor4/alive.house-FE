import React from "react";
import Avatar from "./Avatar";
import arrow from "../../../../assets/SongHomePage/arrow.png";

const Details = () => {
  const [open, setOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  return (
    <div>
      <div className="min-h-[40vh] bg-white border border-gray">
        <div className="flex justify-around items-center">
          <div className="min-h-[40vh] items-center flex gap-[5rem] justify-center">
            <div className="flex flex-col ">
              <p
                style={{ fontFamily: "Nuform Sans" }}
                className="text-gray text-[48px]"
              >
                songs
              </p>
              <p
                style={{ fontFamily: "Nuform Sans" }}
                className="text-green text-[70px] mt-[-0.5rem]"
              >
                1
              </p>
            </div>
            <div className="flex flex-col ">
              <p
                style={{ fontFamily: "Nuform Sans" }}
                className="text-gray text-[48px]"
              >
                patrons
              </p>
              <p
                style={{ fontFamily: "Nuform Sans" }}
                className="text-green text-[70px] mt-[-0.5rem]"
              >
                0
              </p>
            </div>
          </div>
          <div className="flex gap-[4rem] transition-all duration-300 w-[55vw] my-[5rem] flex-wrap">
            {!open &&
              cards.map((item, i) => {
                if (i < 5) {
                  return <Avatar key={item.id} status={item.status} />;
                }
              })}
            {open &&
              cards.map((item, i) => {
                return <Avatar key={item.id} status={item.status} />;
              })}
          </div>
          {/* <div
            style={{ fontFamily: "Nuform Sans" }}
            onClick={() => setOpen(!open)}
            className="text-[24px] text-gray flex justify-center items-center gap-[1rem]"
          >
            {open ? "hide all" : "see all"}
            <img
              src={arrow}
              className={`${
                open ? "rotate-[-90deg]" : ""
              } transition-all duration-300 h-[2.5rem] mt-[5px]`}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
