import { createState, useState } from "@hookstate/core";
import React from "react";
import { useErrors } from "./useErrors";
import useNoAuth from "./useNoAuth";

const initialState = {};

const songDetails = createState(initialState);

const useSongDetais = () => {
  const { fetchData } = useNoAuth();
  const localCopy = useState(songDetails);
  const [editions, setEditions] = React.useState([]);

  const fetchSongDetails = async (id) => {
    const result = await fetchData(id);
    result && songDetails.merge(result);
    result && setEditions(result?.song_onboarding?.editions);
    result.error && console.log({ error: result.error });
  };

  return {
    localCopy,
    fetchSongDetails,
    editions,
  };
};

export default useSongDetais;
