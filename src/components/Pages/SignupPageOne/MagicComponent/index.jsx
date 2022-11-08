import { createState, useHookstate } from "@hookstate/core";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { getNodeOptions } from "../MagicLogin/nodeOptions";
import { setErrorMessage } from "../../../../hooks/useErrors";
import ErrorModal from "../../../../Modals/ErrorModal";
import { useAnalytics } from "../../../../hooks/useAnalytics";
import EmailInput from "../../../../assets/comps/MagicEmailInput";
// import useRouter from "../../../../hooks/useRouter";
import useMarketplace from "../../../../hooks/use-marketplace";
import {
  changeSingupModalState,
  setshowLoader,
  setUserEmail,
} from "../../../../globalStates/Home";
import emailsvg from "../../../../public/Images/email.svg";
import { useUserprofile } from "../../../../hooks/user-profile";
import InputModal from "../../../../Modals/InputModal";
import { changeInputModalState } from "../../../../globalStates/ModalsState";

const GenerateMagicComponent = () => {
  const [takeUserInput, setTakeUserInput] = useState(false);
  const magic = getNodeOptions();
  const auth = useAuth();
  const { _t } = useAnalytics();
  // const router = useRouter();
  const marketplace = useMarketplace();
  const userProfile = useUserprofile();

  const showEmailModal = () => {
    _t("LOGIN:MAGIC:CLICKED");
    changeSingupModalState(false);
    setTimeout(() => {
      changeInputModalState(true);
    }, 500);
  };

  return (
    <>
      <ErrorModal />
      <AnimatePresence></AnimatePresence>
      <div className="flex-1 bg-yellow border grid place-items-center relative cursor-pointer">
        <div
          className="w-[325px] h-[125px]"
          onClick={() => {
            showEmailModal();
          }}
        >
          <img
            src={emailsvg}
            alt="wallet"
            className="w-full h-full bg-contain"
          />
          <h1 className="whitespace-nowrap absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
            signup/register with email
          </h1>
        </div>
      </div>
    </>
  );
};
export default GenerateMagicComponent;
