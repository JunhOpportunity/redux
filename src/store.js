import { createStore } from "redux";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => {
      state.filter((toDo) => toDo.id !== action.payload);
    },
  },
});

export const store = configureStore({ reducer: toDos.reducer });
export const {add, remove} = toDos.actions;


// export const addToDo = createAction("ADD");
// export const deleteToDo = createAction("DELETE");

// const reducer = (state = ["test"], action) => {
//   switch (action.type) {
//     case addToDo.type:
//       return [{ text: action.payload, id: Date.now(), ...state }];
//     case deleteToDo.type:
//       return state.filter((toDo) => toDo !== action.payload);
//     default:
//       return state;
//   }
// };

// const reducer = createReducer([], (builder) => {
//   builder
//     .addCase(addToDo, (state, action) => {
//       state.push({ text: action.payload, id: Date.now() });
//     })
//     .addCase(deleteToDo, (state, action) => {
//       state.filter((toDo) => toDo.id !== action.payload);
//     });
// });

