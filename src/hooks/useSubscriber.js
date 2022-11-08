import React from "react";

const useSubscriber = () => {
  const put = async (payload) => {
    const response = fetch(
      `${import.meta.env.VITE_BASE}api/song-launch/addSubscriber`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return response;
  };
  return {
    put,
  };
};

export default useSubscriber;
