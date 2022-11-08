/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { StyleSheet, css } from "aphrodite";

export default function LoaderModal({ show }) {
  const cancelButtonRef = useRef(null);

  const loadKeyframes = {
    "0%": {
      boxShadow: "0 2.5em 0 -1.3em",
    },
    "80%": {
      boxShadow: "0 2.5em 0 -1.3em",
    },
    "100%": {
      boxShadow: "0 2.5em 0 -1.3em",
    },
    "40%": {
      boxShadow: "0 2.5em 0 0",
    },
  };

  const sharedStyles = {
    base: {
      borderRadius: "50%",
      width: "2.5em",
      height: "2.5em",
      animationFillMode: "both",
      animationName: loadKeyframes,
      animationDuration: "1.8s",
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
      animationDelay: "initial",
      animationDirection: "initial",
      animationPlayState: "initial",
    },
    beforeAfter: {
      content: "''",
      position: "absolute",
      //   top: 0,
    },
  };

  const styles = StyleSheet.create({
    loader: {
      ...sharedStyles.base,
      color: "#FBD200",
      fontSize: "10px",
      margin: "80px auto",
      position: "relative",
      textIndent: "-9999em",
      transform: "translateZ(0)",
      animationDelay: "-0.16s",
      ":before": {
        ...sharedStyles.base,
        ...sharedStyles.beforeAfter,
        left: "-3.5em",
        animationDelay: "-0.32s",
      },
      ":after": {
        ...sharedStyles.base,
        ...sharedStyles.beforeAfter,
        left: "3.5em",
      },
    },
  });

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
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
                <Dialog.Panel className="relative  rounded-lg px-4 py-10  text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-4xl sm:w-full sm:p-6">
                  <div className={css(styles.loader)} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
