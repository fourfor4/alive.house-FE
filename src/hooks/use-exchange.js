import { useEffect, useMemo, useRef, useState } from "react";

export const useExchange = () => {
  const [tick, setTick] = useState(0);
  const timerRef = useRef();
  const EXCHANGE_RATE_REFRESH_TIMEOUT = 120000;

  const [rates, setRates] = useState();
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTick((t) => t + 1);
    }, EXCHANGE_RATE_REFRESH_TIMEOUT);

    return () => clearInterval(timerRef.current);
  }, []);

  const exchangeRates = (matic) => {
    return {
      usd: (rates ? matic * rates.usd : null)?.toFixed(2),
      inr: (rates ? matic * rates.inr : null)?.toFixed(2),
      matic: matic?.toFixed(2),
    };
  };

  useEffect(() => {
    const getRatesPerMatic = async () => {
      try {
        let res = await fetch(
          `${import.meta.env.VITE_BASE}api/song-editions/getRatesPerMatic`
        );
        let data = await res.json();
        setRates(data?.["matic-network"]);
      } catch (error) {}
    };
    getRatesPerMatic()
      .then(() => {})
      .catch(() => {});
  }, [tick]);

  return {
    exchangeRates,
  };
};
