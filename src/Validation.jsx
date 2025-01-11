export const validateEmail = (value) => {
  if (!value.includes("@")) {
    return 'Адрес электронной почты должен содержать символ "@".';
  } else if (value[value.length - 1] === "@") {
    return 'Введите часть адреса после символа "@".';
  } else if (value[value.length - 1] === ".") {
    return 'Недопустимое положение символа ".".';
  }
  return null;
};

export const validatePassword = (value) => {
  if (!value.match(/[a-z]/)) {
    return "Пароль должен содержать прописные буквы.";
  } else if (!value.match(/[A-Z]/)) {
    return "Пароль должен содержать заглавные буквы.";
  } else if (!value.match(/[0-9]/)) {
    return "Пароль должен содержать цифры.";
  } else if (value.length < 8) {
    return "Пароль должен содержать минимум 8 символов.";
  } else if (!value.match(/[\W_]/)) {
    return "Пароль должен содержать специальные символы.";
  }
  return null;
};
