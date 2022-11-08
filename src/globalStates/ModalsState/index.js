//Input Modal

import { createState, useState } from "@hookstate/core";

const inputModal = createState(false);
export const changeInputModalState = (state) => {
  inputModal.set(state);
};
export const useInputModal = () => useState(inputModal);
