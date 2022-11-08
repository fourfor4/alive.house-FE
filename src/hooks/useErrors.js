import { useState, createState } from "@hookstate/core";
import { useEffect, useCallback } from "react";
const initialState = {
  errorTimeStamp: 1,
  infoTimeStamp: 0,
  online: false,
  errorMsg: "",
  errorTitle: "",
  infoMsg: "",
  infoTitle: "",
};

const errorState = createState(initialState);

export const setErrorMessage = ({ title, message }) => {
  errorState.errorMsg.set(message || "");
  errorState.errorTitle.set(title || "");
  errorState.infoTimeStamp.set(Date.now());
};
export const setInfoMessage = ({ title, message }) => {
  errorState.infoMsg.set(message || "");
  errorState.infoTitle.set(title || "");
  errorState.infoTimeStamp.set(Date.now());
};
export const useErrors = () => {
  // const reachabilityCallbackOnline = useCallback(() => {
  //   errorState.online.set(true);
  // }, []);
  // const reachabilityCallbackOffline = useCallback(() => {
  //   errorState.online.set(false);
  // }, []);
  // useEffect(() => {
  //   window.addEventListener("offline", reachabilityCallbackOffline);
  //   window.addEventListener("online", reachabilityCallbackOnline);

  //   // cleanup if we unmount
  //   return () => {
  //     window.removeEventListener("offline", reachabilityCallbackOffline);
  //     window.removeEventListener("online", reachabilityCallbackOnline);
  //   };
  // }, []);

  return useState(errorState);
};
