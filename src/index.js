import { createStore } from "redux";
import { CALCULATE_TYPE, TODO_TYPE } from "./constants/handleName";

// Redux 기본
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
  store.dispatch({ type: CALCULATE_TYPE.PLUS });
};

const handleMinus = () => {
  store.dispatch({ type: CALCULATE_TYPE.MINUS });
};

plus.addEventListener("click", handlePlus);
minus.addEventListener("click", handleMinus);

/* Redux 활용 - Todo */
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const input = document.querySelector("input");

const toDoReducer = (state = [], action) => {
  switch (action.type) {
    case TODO_TYPE.ADD_TODO:
      return [...state, { text: action.text }];
    case TODO_TYPE.DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const reducerStore = createStore(toDoReducer);

reducerStore.subscribe();

const addToDo = (text) => {
  reducerStore.dispatch({ type: TODO_TYPE.ADD_TODO, text });
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
