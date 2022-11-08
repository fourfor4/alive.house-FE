import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE;

export const serviceWithAuth = (service_path, token) => {
  const getHeaders = () => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    token &&
      (() => {
        headers.Authorization = `Bearer ${token}`;
      })();
    return headers;
  };

  const find = async (query_str) => {
    let response = await fetch(
      `${BASE_URL}api/${service_path}?${query_str || ""}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    return response.json();
  };
  const findOne = async (id, query_str) => {
    let response = await fetch(
      `${BASE_URL}api/${service_path}/${id}?${query_str || ""}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    return response.json();
  };
  const update = async (id, payload) => {
    let response = await fetch(`${BASE_URL}api/${service_path}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        data: {
          ...payload,
        },
      }),
    });

    return response.json();
  };

  const remove = async (id) => {
    let response = await fetch(`${BASE_URL}api/${service_path}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify({}),
    });

    return response.json();
  };

  const create = async (payload) => {
    let response = await fetch(`${BASE_URL}api/${service_path}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        data: {
          ...payload,
        },
      }),
    });

    return response.json();
  };

  //GET USER SETTING DETAILS
  const get = async (query = "") => {
    let response = await axios(`${BASE_URL}api/${service_path}/${query}`, {
      method: "GET",
      headers: getHeaders(),
    });
    return response;
  };

  //UPDATE USER SETTING DETAILS
  const put = async (payload, query = "") => {
    // let getData = await get();
    const response = fetch(
      `${import.meta.env.VITE_BASE}api/${service_path}${query}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      }
    );
    return response;
  };

  return { get, put, create, find, update, findOne, remove };
};
export const useService = (service_path) => {
  return serviceWithAuth(service_path, null);
};
