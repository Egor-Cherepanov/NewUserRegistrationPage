import { useRef } from "react";
import styles from "./App.module.css";
import { useStore } from "./useStore";

const sendFormData = (formData) => {
  console.log(formData);
};

export const App = () => {
  const { getState, updateState } = useStore();
  const submitButtonRef = useRef(null);

  const {
    email,
    password,
    passwordRepeat,
    emailError,
    passwordError,
    passwordIsValid,
    emailIsValid,
  } = getState();

  const focusOnSubmitBtn = () => {
    if (
      passwordIsValid === true &&
      emailIsValid === true &&
      password === passwordRepeat
    ) {
      submitButtonRef.current.focus();
    }
  };

  const onEmailChange = ({ target }) => {
    let newError = null;

    if (!target.value.includes("@")) {
      newError = 'Адрес электронной почты должен содержать символ "@".';
    } else if (target.value[target.value.length - 1] === "@") {
      newError = 'Введите часть адреса после символа "@".';
    } else if (target.value[target.value.length - 1] === ".") {
      newError = 'Недопустимое положение символа ".".';
    }

    updateState({
      email: target.value,
      emailError: newError,
      emailIsValid: true,
    });
    focusOnSubmitBtn();
  };

  const onPasswordChange = ({ target }) => {
    let newError = null;

    if (!target.value.match(/[a-z]/)) {
      newError = "Пароль должен содержать прописные буквы.";
    } else if (!target.value.match(/[A-Z]/)) {
      newError = "Пароль должен содержать заглавные буквы.";
    } else if (!target.value.match(/[0-9]/)) {
      newError = "Пароль должен содержать цифры.";
    } else if (target.value.length < 8) {
      newError = "Пароль должен содержать минимум 8 символов.";
    } else if (!target.value.match(/[\W_]/)) {
      newError = "Пароль должен содержать специальные символы.";
    }

    updateState({
      [target.name]: target.value,
      passwordError: newError,
      passwordIsValid: true,
    });
    focusOnSubmitBtn();
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let newError = null;

    if (email === "") {
      newError = "Введите email.";
      return updateState({ emailError: newError });
    } else if (password === "" || passwordRepeat === "") {
      newError = "Введите пароль и повторите его.";
      return updateState({ passwordError: newError });
    } else if (password !== passwordRepeat) {
      newError = "Пароли не совпадают.";
      return updateState({ passwordError: newError });
    }
    sendFormData({ email, password, passwordRepeat });
  };

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        {emailError && <div>{emailError}</div>}
        {passwordError && <div>{passwordError}</div>}
        <input
          name="email"
          type="email"
          placeholder="Почта"
          value={email}
          onChange={onEmailChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onPasswordChange}
        />
        <input
          name="passwordRepeat"
          type="password"
          placeholder="Повтор пароля"
          value={passwordRepeat}
          onChange={onPasswordChange}
        />
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={!!emailError || !!passwordError}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
