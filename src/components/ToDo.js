import { useDispatch } from "react-redux"
import { deleteToDo } from "../store";

export default function ToDo({text, id}) {
  const dispatch = useDispatch();

  return (
    <li>
      {text} <button>DEL</button>
    </li>
  )
}