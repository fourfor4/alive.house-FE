/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import close from "../public/Images/close.svg";

export default function PaymentModal({ show, onClose, onSelect }) {
  const cancelButtonRef = useRef(null);

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
                <Dialog.Panel className="relative bg-white px-4 py-14  text-left overflow-hidden shadow-xl transform transition-all w-[541px] h-[250px] flex flex-col items-center ">
                  <div
                    className="absolute top-5 right-5 w-10 h-10"
                    onClick={onClose}
                  >
                    <img src={close} alt="close-button" />
                  </div>
                  <div>
                    <div className=" text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-4xl leading-6 font-medium text-gray-900 mb-5"
                        style={{ fontFamily: "Nuform Sans" }}
                      >
                        choose a payment method
                      </Dialog.Title>
                      <div className="my-10">
                        <p
                          className="text-2xl text-gray-500 mb-2"
                          style={{ fontFamily: "Nuform Sans" }}
                        >
                          select local currency to pay using your country's
                          local currency
                        </p>
                        <p
                          className="text-2xl text-gray-500"
                          style={{ fontFamily: "Nuform Sans" }}
                        >
                          select metamask to pay using matic
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-[222px] h-[44px] inline-flex justify-center items-center border border-transparent shadow-sm px-4 py-2 bg-yellow text-base font-medium text-gray-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-3xl "
                      onClick={() => onSelect("metamask")}
                      style={{ fontFamily: "Nuform Sans" }}
                    >
                      metamask
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-[222px] h-[44px] inline-flex justify-center items-center border border-transparent shadow-sm px-4 py-2 bg-yellow text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-3xl"
                      onClick={() => onSelect("fiat")}
                      style={{ fontFamily: "Nuform Sans" }}
                      ref={cancelButtonRef}
                    >
                      local currency
                    </button>
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
