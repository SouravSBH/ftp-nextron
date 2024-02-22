import { useCallback, useEffect, useState } from "react";

let globalState = {};

let listeners = {};

export const useGlobalState = (scope = "GLOBAL", initState) => {
  const [state, setState] = useState(
    globalState[scope]
      ? { ...globalState[scope], ...initState }
      : (globalState[scope] = initState)
  );

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

  const dispatch = useCallback(
    async (action, payload) => {
      if (!action || !(action instanceof Function)) {
        return;
      }
      const newState = await action(payload, state, dispatch, setStates);
      if (newState !== undefined) {
        setStates(newState);
      }
    },
    [state]
  );

  console.log();

  useEffect(() => {
    listeners[scope] = listeners[scope]
      ? [...listeners[scope], setState]
      : [setState];
    return () => {
      listeners[scope] = listeners[scope].filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState[scope], setStates, dispatch];
};


import {
  deleteConversationMessage,
  getStylistConversationSearchList,
} from "api-routes/ApiRoutes";
import { resStatus } from "lib/constants/enum/ResponseType";

export const messageActions = {
  START_LOADING: () => {
    return (prev) => ({ ...prev, status: resStatus.LOADING });
  },
  DELETE_MESSAGE: async (
    { message, conversationId, everyone },
    _,
    dispatch
  ) => {
    try {
      dispatch(messageActions.START_LOADING);
      await deleteConversationMessage({
        conversationId,
        messageIds: message._id,
        everyone: everyone,
      });
      return {
        status: resStatus.SUCCESS,
      };
    } catch (e) {
      return {
        status: resStatus.ERROR,
      };
    }
  },
  SEARCH_MESSAGE: async ({ conversationId, searchQuery }, state, setState) => {
    console.log(setState);
    try {
      setState((state) => {
        return {
          ...state,
          status: resStatus.LOADING,
        };
      });
      const res = await getStylistConversationSearchList(
        conversationId,
        searchQuery
      );
      if (!res || res.data.type == resStatus.ERROR) {
        return {
          status: resStatus.ERROR,
          data: null,
        };
      }
      return {
        status: resStatus.SUCCESS,
        data: res?.data,
      };
    } catch (e) {
      return {
        status: resStatus.ERROR,
        data: null,
      };
    }
  },
};
