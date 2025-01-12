import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.css";
import { useRef, useEffect } from "react";

const sendFormData = (formData) => {
  console.log(formData);
};

const fieldsSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^@]+@/, 'Адрес электронной почты должен содержать символ "@".')
    .matches(/@.+..+/, 'Введите часть адреса после символа "@".')
    .min(3, "Неверный email. Должно быть не меньше 3 символов"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/,
      "Пароль должен содержать прописные и заглавные буквы, цифры и специальные символы."
    )
    .min(8, "Неверный пароль. Должно быть не меньше 8 символов"),

  passwordRepeat: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).+$/,
      "Повторный пароль должен содержать прописные и заглавные буквы, цифры и специальные символы."
    )
    .min(8, "Неверный повторный пароль. Должно быть не меньше 8 символов"),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    resolver: yupResolver(fieldsSchema),
    mode: "onChange", // Проверка формы при каждом изменении
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const passwordRepeatError = errors.passwordRepeat?.message;
  const passwordsEquality =
    getValues("password") === getValues("passwordRepeat");
  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (!!emailError && !!passwordError && passwordsEquality) {
      console.log("jhbhbb");
      setTimeout(() => submitButtonRef.current.focus());
    }
  }, [emailError, passwordError, passwordsEquality]);

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(sendFormData)}>
        {emailError && <div>{emailError}</div>}
        {(passwordError || passwordRepeatError || !passwordsEquality) && (
          <div>
            {passwordError || passwordRepeatError || "Пароли не совпададают."}
          </div>
        )}
        <input
          name="email"
          type="text"
          placeholder="Почта"
          {...register("email")}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          {...register("password")}
        />
        <input
          name="passwordRepeat"
          type="password"
          placeholder="Повтор пароля"
          {...register("passwordRepeat")}
        />
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={!!emailError || !!passwordError || !!passwordRepeatError}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
