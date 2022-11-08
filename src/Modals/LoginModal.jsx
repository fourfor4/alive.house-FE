/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import backArrow from "../public/Images/arrowback.svg";
import GenerateMetamaskComponent from "../components/Pages/SignupPageOne/MetamsakComponent";
import GenerateMagicComponent from "../components/Pages/SignupPageOne/MagicComponent";
import { changeSingupModalState } from "../globalStates/Home";

export default function LoginModal({ submit, onClose, show }) {
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");

  const close = () => {
    changeSingupModalState(false);
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={close}
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
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
                <Dialog.Panel className="" onClick={(e) => e.stopPropagation()}>
                  <div
                    onClick={close}
                    className={`w-screen min-h-[calc(100vh-90px)] relative bg-cover bg-no-repeat bg-center flex justify-center items-center`}
                  >
                    <div
                      className="w-[650px] h-[250px] flex"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GenerateMetamaskComponent />
                      <GenerateMagicComponent />
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
