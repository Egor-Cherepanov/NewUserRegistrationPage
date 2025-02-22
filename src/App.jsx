import { useRef } from "react";
import { useStore, initialState } from "./useStore";
import { validateEmail, validatePassword } from "./Validation";
import { AppLayout } from "./AppLayout";

const sendFormData = (formData) => {
  console.log(formData);
};

export const App = () => {
  const { getState, updateState } = useStore();
  const submitButtonRef = useRef(null);
  const { email, password, passwordRepeat, emailError, passwordError } =
    getState();

  const focusOnSubmitBtn = (name, value) => {
    switch (name) {
      case "password":
        if (value === passwordRepeat) {
          setTimeout(() => submitButtonRef.current.focus());
        }
        break;
      case "passwordRepeat":
        if (value === password) {
          setTimeout(() => submitButtonRef.current.focus());
        }
        break;
    }
  };

  const onInputChange = ({ target }) => {
    const { type, value, name } = target;
    let newError = null;

    if (type === "email") {
      newError = validateEmail(value);
    } else if (type === "password") {
      newError = validatePassword(value);
    }

    updateState({
      [name]: value,
      [`${type}Error`]: newError,
    });
    focusOnSubmitBtn(name, value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let newError = null;

    if (password !== passwordRepeat) {
      newError = "Пароли не совпадают.";
      updateState({ passwordError: newError });
      return;
    }

    sendFormData({ email, password, passwordRepeat });
    updateState(initialState);
  };

  return (
    <AppLayout
      onSubmit={onSubmit}
      emailError={emailError}
      passwordError={passwordError}
      email={email}
      onInputChange={onInputChange}
      password={password}
      passwordRepeat={passwordRepeat}
      submitButtonRef={submitButtonRef}
    />
  );
};
