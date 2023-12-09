import { createStore } from "redux";

const plus = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const reducer = (state = 0, action) => {
  if (action.type === "PLUS") {
    return state + 1;
  } else if (action.type === "MINUS") {
    return state - 1;
  } else {
    return state;
  }
};

const store = createStore(reducer);

const onChange = () => {
  number.innerText = store.getState();
};

store.subscribe(onChange);

const handlePlus = () => {
  store.dispatch({ type: "PLUS" });
};

const handleMinus = () => {
  store.dispatch({ type: "MINUS" });
};

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);
