import { createState, useState } from "@hookstate/core";

// Pages

const currentPage = createState("home");

export const changePage = (page) => {
  currentPage.set(page);
};

export const useChangeCurrentPage = () => useState(currentPage);

//Unity

const showUnity = createState(false);

export const changeUnityVisibility = (visibility) => {
  showUnity.set(visibility);
};

export const useShowUnity = () => useState(showUnity);

//loginUser

const loginUser = createState(false);

export const makeUserLogin = () => {
  loginUser.set(true);
};

export const makeUserLogout = () => {
  loginUser.set(false);
};

export const useLoginUser = () => useState(loginUser);

//queryHook

const queryHook = createState(null);

export const changeQuery = (query) => {
  queryHook.set(query);
};

export const useQueryHook = () => useState(queryHook);

//userDetails

const initialDetails = {
  name: "guest",
  score: 420,
  rewardStat: 69,
  nextAt: 9,
  charImg: "",
  avatar: "",
  email: "",
  MetapublicAddress: "",
  MagicPublicAddress: "",
  didToken: "",
};

const userDetails = createState(initialDetails);

export const populateUserDetails = (details) => {
  userDetails.set(details);
};

export const useUserDetails = () => useState(userDetails);

//showPopup

const showPopUp = createState(false);

export const setShowPopup = (bool) => {
  showPopUp.set(bool);
};

export const useShowPopUp = () => useState(showPopUp);

//userEmail

const userEmail = createState("shivam@masalagames.com");

export const setUserEmail = (email) => {
  userEmail.set(email);
};

export const useUserEmail = () => useState(userEmail);

//unity loaded
const unityLoaded = createState(false);

export const setUnityLoaded = (action) => {
  unityLoaded.set(action);
};

export const useChangeUnityLoaded = () => useState(unityLoaded);

//loader

const showLoader = createState(false);

export const setshowLoader = (state) => {
  showLoader.set(state);
};

export const useShowLoader = () => useState(showLoader);

//SignupModal

const signupModal = createState(false);

export const changeSingupModalState = (state) => {
  signupModal.set(state);
};

export const useSignupModal = () => useState(signupModal);

//isPaymentPending

const isPaymentPending = createState(false);

export const setPaymentState = (state) => {
  isPaymentPending.set(state);
};
export const usePaymentPending = () => useState(isPaymentPending);

//unity button state

const buttonColor = createState(false);

export const changeUnityButtonState = (state) => {
  buttonColor.set(state);
};

export const useButtonState = () => useState(buttonColor);

//cookie

const CookiePopup = createState(true);

export const changCookieState = (state) => {
  CookiePopup.set(state);
};

export const useCookiePolicy = () => useState(CookiePopup);

//Button State

const isButtonClicked = createState(false);

export const changebuttonState = (clickState) => {
  isButtonClicked.set(clickState);
};

export const useIsButtonClicked = () => useState(isButtonClicked);

//multiplayerState

const isMultiplayerClicked = createState(false);

export const changeMultiplayerState = (state) => {
  isMultiplayerClicked.set(state);
};

export const useMultiplayerClicked = () => useState(isMultiplayerClicked);

//ButtonAction

const ButtonAction = createState("regular");

export const chnageButtonAction = (action) => {
  ButtonAction.set(action);
};

export const useButtonAction = () => useState(ButtonAction);
