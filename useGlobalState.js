import { useEffect, useState } from "react";

let globalState = {};

let listeners = {};

export const useGlobalState = (scope = "GLOBAL", initState) => {
  const setState = useState(
    globalState[scope]
      ? { ...globalState[scope], ...initState }
      : (globalState[scope] = initState)
  )[1];

  const setStates = (newState) => {
    if (typeof newState === "function") {
      globalState[scope] = newState(globalState[scope]);
    } else {
      globalState[scope] = newState;
    }
    for (const listener of listeners[scope]) {
      listener(globalState[scope]);
    }
  };

  useEffect(() => {
    listeners[scope] = listeners[scope]
      ? [...listeners[scope], setState]
      : [setState];
    return () => {
      listeners[scope] = listeners[scope].filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState[scope], setStates];
};
