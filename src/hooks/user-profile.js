import { createState, useState } from "@hookstate/core";
import { useEffect, useRef } from "react";
import { useErrors } from "./useErrors";
import { serviceWithAuth, useService } from "./useService";

const initialState = {
  networkInProgress: false,
  data: {},
};

const userProfileState = createState(initialState);
const service_path = "users";

export const useUserprofile = () => {
  let service = useRef(useService(service_path));
  let errorState = useErrors();
  const value = useState(userProfileState);

  // useEffect(() => {
  //   console.log({ value });
  // }, [value?.value]);

  const setToken = async (token) => {
    service.current = serviceWithAuth(service_path, token);
    await fetchMe();
  };

  const fetchMe = async () => {
    let result = await service.current.get("me");
    result.data && userProfileState.data.merge(result.data);
    result.error && errorState.errorMsg.set(result.error.message);
    return result.data;
  };

  const patchMe = async (payload) => {
    let result = await service.current.put(
      payload,
      "-permissions/auth/updateMe"
    );
    await fetchMe();
    return result;
  };

  return {
    setToken,
    value,
    service,
    fetchMe,
    patchMe,
  };
};
