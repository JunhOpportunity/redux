import { createStore } from "redux";
import { CALCULATE_NAME } from "./constants/handleName";

const plus = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "PLUS":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(reducer);

const onChange = () => {
  number.innerText = store.getState();
};

store.subscribe(onChange);

const handlePlus = () => {
  store.dispatch({ type: CALCULATE_NAME.PLUS });
};

const handleMinus = () => {
  store.dispatch({ type: CALCULATE_NAME.MINUS });
};

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);
