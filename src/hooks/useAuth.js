import { createState } from "@hookstate/core";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import {
  changePage,
  makeUserLogin,
  makeUserLogout,
  setshowLoader,
  usePaymentPending,
} from "../globalStates/Home";

const initialState = {
  token: null,
};

const authState = createState(initialState);

const decryptToken = (encryptedToken) => {
  const decryptedToken = encryptedToken;
  return decryptedToken;
};

const encryptToken = (token) => {
  const encryptedToken = token;
  return encryptedToken;
};

const useAuth = () => {
  useEffect(() => {
    authState.token.set(decryptToken(localStorage.getItem("token")));
  }, []);

  const token = () => authState.token.value;

  const setToken = (token) => {
    const encrypted_token = encryptToken(token);
    localStorage.setItem("token", encrypted_token);
    authState.token.set(encrypted_token);
    setshowLoader(false);
    makeUserLogin();
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    makeUserLogout();
  };

  const createAndVerify = async (payload, service_path) => {
    let response = await fetch(
      `${import.meta.env.VITE_BASE}api/auth/${service_path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      }
    );
    return response.json();
  };

  const getData = async (query, service_path) => {
    let response = await fetch(
      `${import.meta.env.VITE_BASE}api/auth/${service_path}${query}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );

    return response.json();
  };

  const verifyUser = async (publicAddress, nonce) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(
      `I am signing my one-time nonce: ${nonce}`
    );
    const result = await createAndVerify(
      { publicAddress, signature },
      "verify-signature"
    );
    return result;
  };

  const generateRandomPassword = () => {
    return (
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    );
  };

  return {
    token,
    setToken,
    removeToken,
    createAndVerify,
    generateRandomPassword,
    getData,
    verifyUser,
  };
};

export default useAuth;
