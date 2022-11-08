/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { changeSingupModalState } from "../globalStates/Home";
import closeImg from "../assets/SongHomePage/Close_Stroke.svg";
import useRouter from "../hooks/useRouter";

export default function PaymentCompleteModal({
  submit,
  onClose,
  show,
  link = "",
}) {
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const close = () => {
    changeSingupModalState(false);
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
                  <div className=" flex flex-col justify-center w-[50rem] h-[30rem] bg-white border border-gray relative">
                    <div className="absolute top-[2%] right-[2%] justify-end">
                      <img
                        onClick={onClose}
                        src={closeImg}
                        alt="close icon"
                        className="w-[3rem]"
                      />
                    </div>
                    <div className="w-[50rem] items-center  justify-center flex flex-col">
                      <p
                        style={{ fontFamily: "Nuform Sans" }}
                        className="w-[40rem] text-gray mt-[2rem] text-center leading-[1.2] text-[26px]"
                      >
                        thank you for purchasing a.live edition
                      </p>
                      <p
                        style={{ fontFamily: "Nuform Sans" }}
                        className="w-[40rem] text-gray mt-[2rem] text-center leading-[1.2] text-[20px]"
                      >
                        you can see it in ‘your collection’ section of the
                        website.
                        <br />
                        please find your purchase agreement{" "}
                        {link ? (
                          <a href={`${link}`} target="_blank">
                            <span className="text-green text-[20px] font-bold  cursor-pointer">
                              here
                            </span>
                          </a>
                        ) : (
                          <span
                            className="text-green text-[20px] font-bold cursor-pointer"
                            onClick={() => router.push("/notfound")}
                          >
                            here
                          </span>
                        )}
                      </p>
                      <div className="flex mt-[2rem] gap-[3rem]">
                        <button
                          onClick={onClose}
                          style={{ fontFamily: "Nuform Sans" }}
                          className=" text-[18px] text-gray w-[10rem] h-[5rem] bg-yellow border border-gray"
                        >
                          close
                        </button>
                      </div>
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
