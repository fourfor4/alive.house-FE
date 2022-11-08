import { createState, useState } from "@hookstate/core";
import { useRef } from "react";
import { useErrors } from "./useErrors";
import { serviceWithAuth, useService } from "./useService";

const initialState = {
  networkInProgress: false,
  data: {},
};

const artistProfileState = createState(initialState);
const service_path = "artist-profiles";

export const useArtistProfile = () => {
  let service = useRef(useService(service_path));
  let errorState = useErrors();
  const value = useState(artistProfileState);

  const setToken = async (token, query) => {
    service.current = serviceWithAuth(service_path, token);
    await fetchMe(query);
  };

  const fetchMe = async (query) => {
    let result = await service.current.get(query);
    console.log("got", { result });
    result.data && artistProfileState.data.merge(result.data);
    result.error && errorState.errorMsg.set(result.error.message);
    return result;
  };

  return {
    setToken,
    value,
    service,
    fetchMe,
  };
};
