import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ToDo from "../components/ToDo";
import { addToDo } from "../store";


export default function Home() {
  const [text, setText] = useState("");
  const todo = useSelector((state) => state);
  const dispatch = useDispatch();

  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    dispatch(addToDo.addToDo(text));
    setText("");
  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>ADD</button>
      </form>
      <ul>
        {todo.map((todo) => (
          <ToDo props={todo} />
        ))}
      </ul>
    </>
  );
}
