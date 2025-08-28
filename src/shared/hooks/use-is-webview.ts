export const useIsWebview = () => {
  const USER_AGENT_NAME = "SORISOOP_WEB_VIEW";
  const isWebView = window.navigator.userAgent.includes(USER_AGENT_NAME);
  return { isWebView };
};
