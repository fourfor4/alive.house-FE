/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import backArrow from "../public/Images/arrowback.svg";
import { changeInputModalState } from "../globalStates/ModalsState";
import useAuth from "../hooks/useAuth";
import { useAnalytics } from "../hooks/useAnalytics";
import useMarketplace from "../hooks/use-marketplace";
import { useUserprofile } from "../hooks/user-profile";
import { setUserEmail, usePaymentPending } from "../globalStates/Home";
import { setErrorMessage } from "../hooks/useErrors";
import { useHookstate } from "@hookstate/core";

export default function InputModal({ show }) {
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");

  const auth = useAuth();
  const { _t } = useAnalytics();
  // const router = useRouter();
  const marketplace = useMarketplace();
  const userProfile = useUserprofile();
  const paymentState = useHookstate(usePaymentPending());

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const submit = async () => {
    changeInputModalState(false);
    if (validateEmail(email)) {
      // console.log("validate");
      setUserEmail(email);

      // marketplace.handleMagiclinkLogin(email);
      await marketplace.loginMagic(email);
      if (paymentState?.value) {
        setTimeout(() => {
          marketplace.state.showPaymentsPopup.set(true);
        }, 500);
      }
    } else {
      setTimeout(() => {
        setErrorMessage({
          title: "Invalid Email",
          message: "Please provide a valid email address",
        });
      }, 500);
    }
  };

  const onClose = () => {
    changeInputModalState(false);
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed z-10 inset-0 overflow-y-auto" onClick={onClose}>
          <div className="absolute top-0 bg-black opacity-60 w-full h-full"></div>
          <div className="absolute top-0 w-full h-full">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="w-[650px] h-[220px] border bg-yellow flex flex-col justify-between items-start p-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="w-[100px] h-10 flex items-center justify-start"
                    onClick={onClose}
                  >
                    <div className="w-[20px] h-full">
                      <img
                        src={backArrow}
                        alt="back-arrow"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="ml-5 text-2xl font-bold">back</p>
                  </div>
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-5xl mb-10"
                      style={{ fontFamily: "Nuform Sans" }}
                    >
                      enter your email
                    </Dialog.Title>
                    <div className="w-[500px] h-32 bg-green flex">
                      <div className="w-full h-full">
                        <input
                          type="text"
                          style={{ fontFamily: "Nuform Sans" }}
                          className="w-full h-full border p-3 text-3xl font-bold"
                          placeholder="enter email id"
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              submit();
                            }
                          }}
                        />
                      </div>
                      <button
                        style={{ fontFamily: "Nuform Sans" }}
                        className="w-72 h-full bg-green text-3xl border"
                        onClick={submit}
                      >
                        signup/login
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
