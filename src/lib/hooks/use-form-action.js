import { useActionState, useEffect, useReducer } from "react";

const useFormAction = (action) => {
  const [serverState, formAction, isPending] = useActionState(action, {
    message: null,
    errors: {},
  });

  const serverMessage = serverState?.message;
  const success = serverState?.success;
  const serverErrors = serverState?.errors;

  const [state, dispatch] = useReducer(errorReducer, { errors: {} });
  const errors = state?.errors;

  useEffect(() => {
    if (serverErrors && Object.keys(serverErrors).length > 0) {
      dispatch({ type: "SET_ERROR", payload: serverErrors });
    }
  }, [serverErrors]);

  const hasErrors = Object.keys(errors)?.length > 0;

  const states = {
    success,
    serverMessage,
    hasErrors,
    errors,
    isPending,
  };
  return [states, dispatch, formAction];
};

function errorReducer(state, action) {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };

    case "CLEAR_ERROR":
      const { [action.payload]: _, ...rest } = state.errors;
      return {
        ...state,
        errors: rest,
      };

    case "CLEAR_ALL_ERRORS":
      return { ...state, errors: {} };

    default:
      throw new Error(`No action matched with ${action.type}`);
  }
}

export default useFormAction;
