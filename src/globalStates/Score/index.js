import { createState, useState } from "@hookstate/core";

//start

const startScore = createState(0);

export const changeStartScore = (score) => {
  startScore.set(score);
};

export const useStartScore = () => useState(startScore);

//end

const endScore = createState(0);

export const changeEndScore = (score) => {
  endScore.set(startScore.value + score);
  changeStartScore(endScore.value);
};

export const useEndScore = () => useState(endScore);
