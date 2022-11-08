import { useHookstate } from "@hookstate/core";
import { memo, useState } from "react";
import { useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import {
  changebuttonState,
  changeUnityVisibility,
  setUnityLoaded,
  useButtonAction,
  useButtonState,
  useIsButtonClicked,
  useLoginUser,
  useMultiplayerClicked,
  useShowUnity,
} from "../../../globalStates/Home";
import Unityloader from "../../../assets/Webgl/Loading";
import useAuth from "../../../hooks/useAuth";
import { useUserprofile } from "../../../hooks/user-profile";

const baseurl = import.meta.env.VITE_UNITY_BUILD;
const currentVersion = import.meta.env.VITE_UNITY_FOLDER_VERSION;
// const baseurl = "https://cdn.alive.house/frontend-ui/dev";
// const currentVersion = "20220824_v1";

export const unityContext = new UnityContext({
  loaderUrl: `${baseurl}/${currentVersion}/Build/latestBuild.loader.js`,
  dataUrl: `${baseurl}/${currentVersion}/Build/latestBuild.data`,
  frameworkUrl: `${baseurl}/${currentVersion}/Build/latestBuild.framework.js`,
  codeUrl: `${baseurl}/${currentVersion}/Build/latestBuild.wasm`,
  streamingAssetsUrl: `${baseurl}/${currentVersion}/StreamingAssets`,
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

const Index = ({ state, data }) => {
  const unityState = useHookstate(state);
  const unityData = useHookstate(data);
  const buttonClickState = useHookstate(useButtonState());
  const [progress, setProgress] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const auth = useAuth();
  const loggedInState = useHookstate(useLoginUser());
  const buttonState = useHookstate(useIsButtonClicked());
  const mutiplayerState = useHookstate(useMultiplayerClicked());
  // const userProfile = useUserprofile();

  // useEffect(() => {
  //   console.log(JSON.stringify(unityData?.value), {
  //     unity: unityData?.srt?.get(),
  //   });
  // }, [unityData?.value]);

  useEffect(() => {
    unityContext.on("progress", function (progression) {
      setProgress(progression);
      if (progression === 1) {
        setInProgress(false);
      }
    });

    unityContext.on("unityLoaded", () => {
      const glbData = localStorage.getItem("avatar");
      setTimeout(() => {
        unityContext.send(
          "BaseScene",
          "SetAvatarURL",
          glbData ||
            "https://d1a370nemizbjq.cloudfront.net/d386e589-7cb2-4d5b-8792-9ab3d60ab6bc.glb"
        );
      }, 1000);
    });

    unityContext.on("quitted", function () {
      changebuttonState(false);
      changeUnityVisibility(false);
    });
    return () => {
      unityContext.removeAllEventListeners();
    };
  }, []);

  useEffect(() => {
    if (loggedInState?.value) {
      setTimeout(() => {
        sendDataToUnity();
      }, 1000);
    }
  }, [loggedInState?.value]);

  useEffect(() => {
    if (buttonState?.value && !inProgress) {
      const data = JSON.stringify(unityData?.value);
      unityContext.send("BaseScene", "LoadLoader", data || "");
      unityContext.send("BaseScene", "SetToken", auth.token() || "");
      unityContext.send(
        "BaseScene",
        "SetMultiplayerParty",
        `${mutiplayerState?.value}`
      );
      // if (buttonAction?.value === "party") {
      //   console.log({ SetMultiplayerParty: true });
      //   unityContext.send("BaseScene", "SetMultiplayerParty", true);
      // } else {
      //   console.log({ SetMultiplayerParty: false });
      //   unityContext.send("BaseScene", "SetMultiplayerParty", false);
      // }
    }
  }, [buttonState?.value, inProgress]);

  function sendDataToUnity() {
    unityContext.send("BaseScene", "SetToken", auth.token() || "");
  }

  return (
    <>
      <Unity
        className="w-full h-full"
        unityContext={unityContext}
        // style={{ cursor: "url(../../assets/Main/Images/cursor.png),auto" }}
      />
      {inProgress && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            placeItems: "center",
            backgroundColor: "#24262b",
            position: "absolute",
            top: 0,
          }}
        >
          <Unityloader progression={progress} />
        </div>
      )}
    </>
  );
};

export default memo(Index);
