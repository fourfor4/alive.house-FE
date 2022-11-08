import { serviceWithAuth, useService } from "./useService";
import { useRef, useState } from "react";

const service_path = "onmeta-transactions";
export const useOnmetaTransaction = () => {
  let service = useRef(useService(service_path));

  const setToken = (token) => {
    service.current = serviceWithAuth(service_path, token);
  };

  const initiateTransaction = async (payload) => {
    let result = await service.current.create(payload || {});

    return result;
  };
  const setOrderId = async (newTxnId, orderId) => {
    let result = await service.current.update(newTxnId, { orderId });

    return result;
  };

  const update = async (newTxnId, payload) => {
    try {
      let result = await service.current.update(newTxnId, payload);

      return result;
    } catch (error) {
      console.log(
        `unable to update status of onmeta-transaction:${newTxnId}`,
        payload
      );
    }
  };

  return { setToken, initiateTransaction, setOrderId, update };
};
