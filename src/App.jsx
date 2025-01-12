import { useRef } from "react";
import { useStore } from "./useStore";
import { validateEmail, validatePassword } from "./Validation";
// import { AppLayout } from "./AppLayout";
import { useForm } from "react-hook-form";

const sendFormData = (formData) => {
  console.log(formData);
};

const fieldsSchema = yup.object()
    .shape({
        login: yup.string()
            .matches(/^[w_]*$/, 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание')
            .min(3, 'Неверный логин. Должно быть не меньше 3 символов')
            .max(20, 'Неверный логин. Должно быть не больше 20 символов'),


    });

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      // emailError: null,
      password: "",
      // passwordError: null,
      passwordRepeat: "",
    },
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const emailProps = {
    minLength: {value: 3, message: 'Должно быть больше 3 символов.'},
    pattern: {value: /^(?!.*@$)(?!.*.$)(?=.*@).+$/, "Email должен соддержать знак '@' и "}
  }
  const passwordProps = {
    minLength: {value: 8, message: 'Должно быть больше 8 символов.'},

  }

  const { getState, updateState } = useStore();
  const submitButtonRef = useRef(null);

  const { email, password, passwordRepeat, emailError, passwordError } =
    getState();

  const focusOnSubmitBtn = (name, value) => {
    switch (name) {
      case "password":
        if (value === passwordRepeat) {
          submitButtonRef.current.focus();
        }
        break;
      case "passwordRepeat":
        if (value === password) {
          console.log(submitButtonRef);
          submitButtonRef.current.focus();
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

  const onSubmit = (formData) => {
    event.preventDefault();
    console.log(event.target.password.value);

    let newError = null;

    if (password !== passwordRepeat) {
      newError = "Пароли не совпадают.";
      updateState({ passwordError: newError });
      return;
    }

    sendFormData({ email, password, passwordRepeat });
  };

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
