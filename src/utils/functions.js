const loadLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const removeLocalStorageItem = key => {
  localStorage.removeItem(key);
};

const getBrowser = () => {
  const isFirefox = typeof InstallTrigger !== "undefined";
  const isSafari = navigator.userAgent.indexOf("Safari");
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;
  const isEdge = !isIE && !!window.StyleMedia;

  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  if (isChrome) return "Google Chrome";
  if (isFirefox) return "Firefox";
  if (isIE) return "Internet Explorer";
  if (isEdge) return "Microsoft Edge";
  if (isSafari) return "Safari";
};

export default { loadLocalStorage, removeLocalStorageItem, getBrowser };
