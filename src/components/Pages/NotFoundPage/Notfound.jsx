import React from "react";
import { useEffect } from "react";
import { useAnalytics } from "../../../hooks/useAnalytics";

const Notfound = () => {
  const { _t } = useAnalytics();

  useEffect(() => {
    _t("SUCCESS:NOAGREEMENT:PAGE");
  }, []);

  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center">
      <h1 className="text-[90px]">agreement not found</h1>
      <p className="text-[45px]">please contact alive team.</p>
    </div>
  );
};

export default Notfound;
