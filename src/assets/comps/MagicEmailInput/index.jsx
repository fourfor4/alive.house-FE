import { keyframes } from "@emotion/react";
import { useHookstate } from "@hookstate/core";
import { motion } from "framer-motion";
import { useState } from "react";
import backArrow from "../../../public/Images/arrowback.svg";

const EmailInput = ({ close, submit, top = "top-[-80px]", h = "" }) => {
  const [email, setEmail] = useState("");
  return (
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      className={`w-[100vw] absolute ${top} left-0 ${h} z-[200]`}
    >
      <div className="w-full h-full absolute top-0 bg-black opacity-90"></div>
      <div
        className="w-full h-full absolute top-0 flex items-center justify-center"
        onClick={close}
      >
        <div
          className="w-[650px] h-[220px] border bg-yellow flex flex-col justify-between items-start p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-[100px] h-10 flex items-center justify-start"
            onClick={close}
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
            <h1 className="text-5xl mb-10">enter your email below</h1>
            <div className="w-[500px] h-32 bg-green flex">
              <div className="w-full h-full">
                <input
                  type="text"
                  className="w-full h-full border p-3 text-3xl font-bold"
                  placeholder="enter email id"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      submit(email);
                    }
                  }}
                />
              </div>
              <button
                className="w-72 h-full bg-green text-3xl border"
                onClick={() => submit(email)}
              >
                signup/login
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailInput;
