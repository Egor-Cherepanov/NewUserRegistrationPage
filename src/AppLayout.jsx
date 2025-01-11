import PropTypes from "prop-types";
import styles from "./App.module.css";

export const AppLayout = (props) => {
  const {
    onSubmit,
    emailError,
    passwordError,
    email,
    onInputChange,
    password,
    passwordRepeat,
    submitButtonRef,
  } = props;
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
          onChange={onInputChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onInputChange}
        />
        <input
          name="passwordRepeat"
          type="password"
          placeholder="Повтор пароля"
          value={passwordRepeat}
          onChange={onInputChange}
        />
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={
            !!emailError ||
            !!passwordError ||
            email === "" ||
            password === "" ||
            passwordRepeat === ""
          }
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

AppLayout.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  email: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  password: PropTypes.string,
  passwordRepeat: PropTypes.string,
  submitButtonRef: PropTypes.object,
};
