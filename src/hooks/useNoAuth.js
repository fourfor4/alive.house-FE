import React, { useState } from "react";

const service_path = "songs";

const useNoAuth = () => {
  const fetchDataByQuery = async (Pagequery = 2, sortQuery = "id:desc") => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE
      }api/${service_path}?sort=${sortQuery}&pagination[pageSize]=${Pagequery}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );
    return response.json();
  };

  const fetchData = async (query = "") => {
    console.log(`${import.meta.env.VITE_BASE}api/songs/${query}`);
    const result = await fetch(
      `${import.meta.env.VITE_BASE}api/songs/${query}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );
    return result.json();
  };

  const fetchLatestLaunch = async (service_path, query) => {
    const result = await fetch(
      `${import.meta.env.VITE_BASE}api/${service_path}${query}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );
    return result.json();
  };

  return {
    fetchDataByQuery,
    fetchData,
    fetchLatestLaunch,
  };
};

export default useNoAuth;
