import React from "react";
import close from "../../../../assets/SongHomePage/Close_Stroke2.svg";
import { changCookieState } from "../../../../globalStates/Home";
import useRouter from "../../../../hooks/useRouter";

const Cookies = ({ setShowCookie }) => {
  const router = useRouter();

  const cookieIsAccepted = () => {
    localStorage.setItem("accepted", true);
    setShowCookie(false);
  };

  return (
    <div className="">
      <div className="fixed top-[0] z-[1000] flex items-end h-[100vh] opacity-[0.95] w-[100vw] bg-gray"></div>
      <div className="fixed  top-[80vh] z-[1500] w-[100vw] h-[20vh] bg-green border border-gray opacity-[1]">
        <div className="flex justify-end w-[98vw] mt-[1rem]">
          <img onClick={() => setShowCookie(false)} src={close} alt="close" />
        </div>
        <div className="flex items-center justify-center w-[100vw] h-[8vh]">
          <div className="w-[50%]">
            <p
              className="text-[20px] text-gray"
              style={{ fontFamily: "Nuform Sans" }}
            >
              we use cookies to ensure that you get the best experience on our
              website.
            </p>
            {/* <p
              className="text-[16px] text-gray"
              style={{ fontFamily: "Nuform Sans" }}
            >
              by clicking accept, you agree with our terms of service and
              privacy policy.
            </p> */}
          </div>
          <div className="w-[30%] flex gap-[2rem]">
            <button
              style={{ fontFamily: "Nuform Sans" }}
              className=" text-[18px] text-gray w-[15rem] h-[5rem] bg-white border border-gray"
              onClick={() => {
                router.push("/privacypolicy");
              }}
            >
              learn more
            </button>
            {/* <button
              onClick={cookieIsAccepted}
              style={{ fontFamily: "Nuform Sans" }}
              className=" text-[18px] text-gray w-[15rem] h-[5rem] bg-yellow border border-gray"
            >
              accept
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
