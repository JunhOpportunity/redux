import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

export const addToDo = createAction("ADD");
export const deleteToDo = createAction("DELETE");

const reducer = (state = ["test"], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now(), ...state }];
    case deleteToDo.type:
      return state.filter((toDo) => toDo !== action.payload);
    default:
      return state;
  }
};

export const store = createStore(reducer);
