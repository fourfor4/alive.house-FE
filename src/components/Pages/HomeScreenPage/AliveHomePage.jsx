import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import EverySong from "./components/EverySong";
import Notify from "./components/Notify";
import PickAWorld from "./components/PickAWorld";
import Footer from "./components/Footer";
import AnimatePage from "../../../assets/comps/AnimateComponent";
import { useHookstate } from "@hookstate/core";
import { useCookiePolicy, useLoginUser } from "../../../globalStates/Home";
import useRouter from "../../../hooks/useRouter";
import Laylo from "../../../assets/comps/Laylo/Laylo";
import Cookies from "./components/Cookies";
import ErrorModal from "../../../Modals/ErrorModal";

const AliveHomePage = () => {
  const localLoginState = useHookstate(useLoginUser());
  const router = useRouter();

  useEffect(() => {
    if (localLoginState?.value) {
      router.push("/Home");
    }
  }, [localLoginState?.value]);

  return (
    <>
      <AnimatePage>
        <div className="relative">
          <Hero />
          <EverySong />
          <Notify />

          <PickAWorld />
          <Footer />
        </div>
      </AnimatePage>
    </>
  );
};

export default AliveHomePage;
