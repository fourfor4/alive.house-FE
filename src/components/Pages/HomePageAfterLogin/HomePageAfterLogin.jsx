import { useHookstate } from "@hookstate/core";

import React, { useEffect } from "react";
import {
  setshowLoader,
  setShowPopup,
  useLoginUser,
  useUserDetails,
} from "../../../globalStates/Home";
import useAuth from "../../../hooks/useAuth";
import { useUserprofile } from "../../../hooks/user-profile";
import useRouter from "../../../hooks/useRouter";
import Footer from "../HomeScreenPage/components/Footer";
import Nav from "../HomeScreenPage/components/Nav";
import Character from "./components/Character";
import HeroSection from "./components/HeroSection";
import PickAworld from "./components/PickAworld";
import { unityContext } from "../../Webgl/FlyingThrough";
import Stats from "./components/Stats";
import ErrorModal from "../../../Modals/ErrorModal";

const HomePageAfterLogin = () => {
  const localState = useHookstate(useLoginUser());
  const localUserDetails = useHookstate(useUserDetails());
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    if (!localState?.value) {
      router.push("/");
    }
    const getAvatar = localStorage.getItem("avatar");
    if (getAvatar) {
      render(getAvatar);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
  }, []);
  const receiveMessage = (event) => {
    if (event?.data) {
      // console.log({ event: event?.data });
      unityContext.send("BaseScene", "SetAvatarURL", event?.data);
      if (typeof event?.data === "string") {
        localStorage.setItem("avatar", event?.data);
      }
      setShowPopup(false);
      render(event?.data);
    }
  };

  // React.useEffect(() => {
  //   if (localUserDetails?.charImg?.value) {
  //     render(localUserDetails?.charImg?.value);
  //   }
  // }, [localUserDetails?.charImg?.value]);

  function render(modelUrl) {
    const params = {
      // Replace with the .glb URL for the desired avatar.
      model: modelUrl,
      // Type of portrait to render.
      scene: "fullbody-portrait-v1",
      // Optional: "Pose",
      // Default: "T-pose",

      armature: "ArmatureTargetMale",
      // Optional: Facial expression. Default: Empty.
      blendShapes: { Wolf3D_Avatar: { mouthSmile: 0.2 } },
    };
    const http = new XMLHttpRequest();
    http.open("POST", "https://render.readyplayer.me/render");
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));
    http.onload = function () {
      // Show the response
      // console.log({ response: http.responseText });

      // Parse the response and display the image
      var image = JSON.parse(http.responseText)["renders"];
      if (image?.[0]) {
        localUserDetails.avatar.set(image[0]);

        return;
      } else {
        console.log("");
      }
    };
  }

  return (
    <>
      <ErrorModal />
      <div>
        <Nav />
        <Stats />
        <HeroSection />
        <Character />
        <PickAworld />
        <Footer dark />
      </div>
    </>
  );
};

export default HomePageAfterLogin;
