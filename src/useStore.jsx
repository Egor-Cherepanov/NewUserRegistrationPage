import { useState } from "react";

export const initialState = {
  email: "",
  emailError: null,
  password: "",
  passwordError: null,
  passwordRepeat: "",
};

export const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (newValues) => {
      setState({ ...state, ...newValues });
    },
  };
};
