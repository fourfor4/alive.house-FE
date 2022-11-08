import React, { useEffect, useRef, useState } from "react";
import { memo } from "react";
import { useEndScore, useStartScore } from "../../../globalStates/Score";

const Counter = () => {
  let start = useStartScore().get();
  let end = useEndScore().get();
  // console.log({ start, end });

  const [state, setstate] = useState(null);
  const Startref = useRef(start);

  const accumulator = end / 200;

  const updateCounterState = () => {
    if (Startref.current < end) {
      const result = Math.ceil(Startref.current + accumulator);
      if (result > end) return setstate(end);
      setstate(result);
      Startref.current = result;
    }
    setTimeout(updateCounterState, 100);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      updateCounterState();
    }
    return () => (isMounted = false);
  }, [end, start]);

  return <h1 className="text-4xl font-bold mr-8">{state || start}</h1>;
};

export default memo(Counter);
