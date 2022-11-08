import React from "react";
import logo from "../../../../public/Images/lightlogo.png";
import darklogo from "../../../../public/Images/betalogo.png";

import { Links } from "../../../../SocialLinks";
import Social from "./Social";
import { changePage } from "../../../../globalStates/Home";
import { memo } from "react";
import useRouter from "../../../../hooks/useRouter";

const Footer = ({ dark }) => {
  const router = useRouter();

  const colors = {
    first: dark ? "#242430" : "#E8ECE2",
    second: dark ? "#E8ECE2" : "#242430",
  };

  return (
    <div>
      <div
        style={{ backgroundColor: colors.first }}
        className={` h-[85px] flex items-center justify-center`}
      >
        <div className="w-[90%] flex justify-between items-center">
          <img
            src={dark ? logo : darklogo}
            className="h-[45px] "
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
          <div className="flex gap-[6rem] ">
            <Social backIsDark={dark} classname="h-[24px]  mr-[1rem]" />
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: colors.second }}
        className={` h-[55px] flex justify-center items-center`}
      >
        <div className="w-[90%] flex justify-between">
          <a href="mailto:contact@alive.house" className="cursor-pointer">
            <p
              className="font-Nuform-Sans text-3xl font-bold"
              style={{
                color: colors.first,
              }}
            >
              contact us
            </p>
          </a>
          <a
            href="https://alivemusic.zendesk.com/hc/en-us"
            className="cursor-pointer"
            target="_blank"
          >
            <p
              className="font-Nuform-Sans text-3xl font-bold"
              style={{
                color: colors.first,
              }}
            >
              faqs
            </p>
          </a>
          <p
            className="font-Nuform-Sans text-3xl font-bold cursor-pointer"
            onClick={() => router.push("/whitepaper")}
            style={{
              color: colors.first,
            }}
          >
            whitepaper
          </p>
          <p
            className="font-Nuform-Sans text-3xl font-bold  cursor-pointer"
            onClick={() => router.push("/privacypolicy")}
            style={{
              color: colors.first,
            }}
          >
            privacy policy
          </p>
          <p
            className="font-Nuform-Sans text-3xl font-bold  cursor-pointer"
            onClick={() => router.push("/legalpolicy")}
            style={{
              color: colors.first,
            }}
          >
            legal policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
