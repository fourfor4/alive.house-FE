import React from "react";
import AnimatePage from "../../../assets/comps/AnimateComponent";
import Stats from "../HomePageAfterLogin/components/Stats";
import Nav from "../HomeScreenPage/components/Nav";
import HeroSection from "./components/HeroSection";
import Library from "./components/Library";
import ContextProvider from "./Context/Context";
import useRouter from "../../../hooks/useRouter";
import { useHookstate } from "@hookstate/core";
import {
  setShowPopup,
  useLoginUser,
  useUserDetails,
} from "../../../globalStates/Home";



const DeckOfCardsPage = () => {
  const localState = useHookstate(useLoginUser());
  const localUserDetails = useHookstate(useUserDetails());
  const router = useRouter();
  React.useEffect(()=>{
    if (!localState?.value) {
      router.push("/");
    }
  },[])

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePage>
      <Nav />
      <Stats />
      <ContextProvider>
      <div>
      <HeroSection/>
      <Library/>
      </div>
      </ContextProvider>
    </AnimatePage>
  );
};

export default DeckOfCardsPage;
