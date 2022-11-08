import React from "react";
import { memo } from "react";
import placeholderImg from "../../../../public/Images/artistplaceholder.png";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import { useNavigate } from "react-router-dom";
import useRouter from "../../../../hooks/useRouter";
const Desc = ({ data }) => {
  const router = useRouter();
  const { _t } = useAnalytics();

  const gotoArtistPage = (id) => {
    if (id) {
      _t("SUCCESS:ARTIST:PAGE");
      router.push(`/artist?id=${id}`);
    }
  };
  return (
    <div className="h-screen bg-white">
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div
          onClick={() =>
            gotoArtistPage(
              data?.song_onboarding?.user?.artistProfile?.id?.value
            )
          }
          style={{ fontFamily: "Nuform Sans" }}
          className="aliveborder h-[55rem] flex justify-between items-center gap-[6rem] cursor-pointer"
        >
          <img
            src={
              data?.song_onboarding?.user?.artistProfile?.profileImage?.url
                ?.value || placeholderImg
            }
            className="h-[45rem] rounded-full ml-[3rem]"
          />
          <div className="w-[calc(120rem-45rem)] h-[50rem] flex flex-col justify-center  items-start">
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="text-[48px] text-[#FF665C]"
            >
              Meet {data?.song_onboarding?.primaryArtists?.[0]?.name?.value}
            </p>
            <p
              style={{ fontFamily: "Nuform Sans" }}
              className="w-[80%] text-gray text-[22px] mr-[1rem]"
            >
              {data?.song_onboarding?.user?.artistProfile?.bandBio?.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Desc);
