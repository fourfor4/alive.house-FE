import { createState, useState } from "@hookstate/core";
import useNoAuth from "./useNoAuth";

const initialState = {};

const lauchDetails = createState(initialState);
const service_path = "song-launches?sort=launchTime:desc&pagination[limit]=";

const useSongLaunch = () => {
  const { fetchLatestLaunch } = useNoAuth();
  const launchDataCopy = useState(lauchDetails);

  const fetchLatestLauch = async () => {
    const result = await fetchLatestLaunch(service_path, 1);
    result && lauchDetails.merge(result);
    result.error && console.log({ error: result.error });
  };

  return {
    launchDataCopy,
    fetchLatestLauch,
  };
};

export default useSongLaunch;
