import { useState } from "react";
// import reactLogo from "./assets/react.svg"
// import viteLogo from "/vite.svg"
// import nums from "./nums.json"
import styles from "./app.module.css";

const getResult = (operator, op1, op2) => {
  let result = 0;
  switch (operator) {
    case "+":
      result = Number(op1) + Number(op2);
      break;
    case "-":
      result = Number(op1) - Number(op2);
      break;
    case "*":
      result = Number(op1) * Number(op2);
      break;
    case ":":
      result = Number(op1) / Number(op2);
      break;
  }
  return result;
};

function App() {
  // const [count, setCount] = useState(0)
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [operand1, setOperand1] = useState("");
  const [operator, setOperator] = useState("");
  const [operand2, setOperand2] = useState("");
  const [result, setResult] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (isNaN(Number(newValue)) || newValue === "0") {
      console.error("Введите числовые значения");
    } else {
      setValue(newValue);
      operator === "" ? setOperand1(newValue) : setOperand2(newValue);
    }
  };

  const handleOperatorClick = (op) => {
    const newOperator = op;

    if (operand2 === "") {
      setValue("");
    } else {
      const updatedOperator1 = getResult(newOperator, operand1, operand2);
      setOperand2("");
      setOperand1(updatedOperator1);
    }

    setValue("");
    setOperator(newOperator);
    console.log(operand1);
  };

  const handleResultClick = () => {
    const operationResult = getResult(operator, operand1, operand2);

    setValue(operationResult);
    setOperand1("");
    setOperand2("");
    setOperator("");
    setResult(true);
  };

  const handleNumberClick = (num) => {
    if (result) {
      // Если результат уже был выведен, начать новый ввод
      setOperand1(num);
      setOperator("");
      setOperand2("");
      setValue(num);
      setResult(false);
    } else if (operator === "") {
      // Если оператор не выбран, добавляем цифры к первому операнду
      const newOperand1 = operand1 + num;
      setOperand1(newOperand1);
      setValue(newOperand1);
    } else {
      // Если оператор выбран, добавляем цифры ко второму операнду
      const newOperand2 = operand2 + num;
      setOperand2(newOperand2);
      setValue(newOperand2);
    }
  };

  const handleClearClick = () => {
    setOperand1("");
    setOperand2("");
    setOperator("");
    setValue("");
    setResult(false);
  };

  return (
    <>
      <div className={styles.calculator}>
        <h1 className={styles.pageHeading}>Калькулятор</h1>
        <input
          className={styles.display}
          type="text"
          value={value}
          onChange={handleChange}
        />
        <div className={styles.buttons}>
          {nums.map((num, key) => {
            return (
              <button
                className={styles.button}
                onClick={() =>
                  value === "" && num === "0"
                    ? setValue(value)
                    : handleNumberClick(num)
                }
                key={key}
              >
                {num}
              </button>
            );
          })}

          <button
            className={styles.button}
            onClick={() => handleOperatorClick("+")}
          >
            +
          </button>
          <button
            className={styles.button}
            onClick={() => handleOperatorClick("-")}
          >
            -
          </button>
          <button
            className={styles.button}
            onClick={() => handleOperatorClick("*")}
          >
            *
          </button>
          <button
            className={styles.button}
            onClick={() => handleOperatorClick("/")}
          >
            :
          </button>
          <button className={styles.button} onClick={handleResultClick}>
            =
          </button>
          <button className={styles.button} onClick={handleClearClick}>
            AC
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
