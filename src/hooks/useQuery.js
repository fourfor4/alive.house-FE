import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useQuery = () => {
  const [urlQuery, setUrlQuery] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();

  const getUrlParams = (param) => {
    const value = searchParams.get(param);
    setUrlQuery(parseInt(value));
  };

  return {
    getUrlParams,
    urlQuery,
  };
};

export default useQuery;
