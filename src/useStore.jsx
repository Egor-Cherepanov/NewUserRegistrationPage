import { useState } from "react";

const initialState = {
  email: "",
  emailError: null,
  emailIsValid: false,
  password: "",
  passwordRepeat: "",
  passwordError: null,
  passwordIsValid: false,
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
