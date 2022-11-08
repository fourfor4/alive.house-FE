/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import WertModule from "@wert-io/module-react-component";
import useMarketplace from "../../../../hooks/use-marketplace";
import WertWidget from "@wert-io/widget-initializer";

export default function WertModal() {
  const marketplace = useMarketplace();
  const wert = useRef();
  const wertContainerRef = useRef();
  const dismiss = () => {
    if (marketplace.state.isWertDismissable.value)
      marketplace.state.showWertWidget.set(false);
  };

  useEffect(() => {
    if (marketplace.state.showWertWidget.value) {
      setTimeout(() => {
        console.log("wertOptions", marketplace.state.wertOptions.value);
        wert.current = new WertWidget(marketplace.state.wertOptions.value);

        wert.current.mount();
      }, 1000);
    }
  }, [marketplace.state.showWertWidget.value]);
  useEffect(() => {
    return () => {
      wert.current = null;
    };
  }, []);
  return (
    <Transition.Root
      show={marketplace.state.showWertWidget.value}
      as={Fragment}
    >
      <Dialog as="div" className="relative z-10" onClose={dismiss}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
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
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left  shadow-xl transform transition-all sm:my-8   sm:p-6">
                <div
                  style={{
                    width: "440px",
                    height: "595px",
                    boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    margin: "auto",
                  }}
                >
                  <div ref={wertContainerRef} id="wert-widget"></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
