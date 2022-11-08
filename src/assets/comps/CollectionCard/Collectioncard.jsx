import { useHookstate } from "@hookstate/core";
import React from "react";
import placeholderImg from "../../../public/Images/placeholder.png";

const CollectionCard = ({ status, light, style, data, func }) => {
  const localData = useHookstate(data);
  const [is3d, setIs3d] = React.useState(false);
  return (
    <div style={{ ...style }} onClick={() => func(localData?.id?.value)}>
      <div
        onMouseEnter={() => setIs3d(true)}
        onMouseLeave={() => setIs3d(false)}
        className={`border bg-white marketplaceCard border-gray h-[40rem] w-[32rem] relative cursor-pointer mx-10`}
      >
        <div
          className={`${
            is3d ? "opacity-100" : "opacity-0"
          } transition-all duration-300 marketplacecardafter1 ${
            light ? "bg-white" : "bg-gray"
          } absolute right-[-10px] top-[-2px]`}
        ></div>
        <div
          className={`${
            is3d ? "opacity-100" : "opacity-0"
          } transition-all duration-300  marketplacecardafter2holder absolute bottom-[-11px] left-[-2px] flex justify-center items-start `}
        >
          <div
            className={`${
              is3d ? "opacity-100" : "opacity-0"
            } transition-all duration-300 marketplacecardafter2 ${
              status === "n" && "bg-gray text-white"
            } left-[-2px] ${status === "c" && "bg-green"} ${
              status === "nr" && "bg-red"
            } ${status === "i" && "bg-yellow"} `}
          ></div>
        </div>
        <div
          className={`h-[20%] border-b border-gray ${
            status === "n" && "bg-gray text-white"
          } ${status === "c" && "bg-green"} ${status === "nr" && "bg-red"} ${
            status === "i" && "bg-yellow"
          }`}
        >
          <div className="flex justify-between h-[100%] items-center">
            {/* <div className="ml-[15px] flex flex-col items-start">
              <p style={{ fontFamily: "Nuform Sans" }} className="text-[12px]">
                played
              </p>
              <p style={{ fontFamily: "Nuform Sans" }} className="text-[18px]">
                0 times
              </p>
            </div> */}
            {/* <div className="mr-[15px] flex flex-col items-end">
              <p style={{ fontFamily: "Nuform Sans" }} className="text-[12px]">
                completed
              </p>
              <p style={{ fontFamily: "Nuform Sans" }} className="text-[18px]">
                0/9
              </p>
            </div> */}
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={placeholderImg}
            className="rounded-full w-[25rem] h-[25rem] mt-[-5rem] object-cover  border-gray"
          />
        </div>
        <div className="flex flex-col items-center">
          <p
            className="text-[14px] text-gray"
            style={{ fontFamily: "Nuform Sans" }}
          >
            {localData?.name?.value || "address"}
          </p>
          {/* <p
            className="text-[28px] text-gray mt-[-1rem]"
            style={{ fontFamily: "Nuform Sans" }}
          >
            {localData?.song_onboarding?.primaryArtists[0]?.name?.value ||
              "artist"}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
