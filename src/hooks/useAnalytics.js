import mixpanel from "mixpanel-browser";

let env_tracking = import.meta.env.VITE_PUBLIC_TRACKING_ENABLED || "";
let tracking_enabled = env_tracking.toLowerCase() === "true";
mixpanel.init(import.meta.env.VITE_PUBLIC_MIXPANEL_TOKEN, {
  api_host:
    import.meta.env.VITE_PUBLIC_MIXPANEL_API_HOST ||
    "https://tracking.alive.house",
});

const enable_functions = ["track", "register", "disable_all_events"];
let trackerObj = {};

for (let func of enable_functions) {
  trackerObj[func] = (...args) => {
    return tracking_enabled && mixpanel && mixpanel[func]
      ? () => {
          try {
            if (mixpanel && typeof mixpanel[func] === "function")
              mixpanel[func].apply(mixpanel, args);
            else console.log("tracking", args);
          } catch (err) {
            console.log("ERROR:ANALYTICS", err);
          }
        }
      : console.log("tracking", args);
  };
}
export const useAnalytics = () => ({
  ...trackerObj,
  _t: trackerObj.track,
  _r: trackerObj.register,
  /**  override default implementation or add custom function
    track: (...args) => {
      return tracking_enabled ? mixpanel.track.apply(mixpanel, args) : null;
    },*/
});
