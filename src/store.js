import { createStore } from "redux";
import { TODO_TYPE } from "./constants/handleName";

export const addToDo = (text) => {
  return {
    type: "ADD",
    text,
  };
};

export const deleteToDo = (id) => {
  return {
    type: "DELETE",
    id,
  };
};

const reducer = (state = ["test"], action) => {
  switch (action.type) {
    case "ADD":
      return [{ text: action.text, id: Date.now(), ...state }];
    case "DELETE":
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;