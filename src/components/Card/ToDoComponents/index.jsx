import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToDo } from "../../../reducer/todoSlice";
import Loading from "../Loading";
import ErrorComponent from "../Error";

function ToDoComponents() {
  const dispatch = useDispatch();
  // since to exneed pert a single to do, we dont need to map throught an array
  // useSelector untuk mendapat data dari state nya
  // tot ini untuk datanya
  const todo = useSelector((state) => state.todos.todo);
  // status ini untuk status loading
  const status = useSelector((state) => state.todos.status);
  // status ini untuk error
  const error = useSelector((state) => state.todos.error);


  // tanpa triger, langsung loading tanpa button
  useEffect(() => {
    // dispatch fetchtodo
    dispatch(fetchToDo());
  }, [dispatch]);
  //print todo. status dan error
  // console.log("todo", todo);
  // console.log("status", status);
  // console.log("error", error);
  // early return untuk loading
  if (status === 'loading') return <Loading />
  // early return untuk error
  if (status === 'failed') return <ErrorComponent message={error} />
  return (
    <div>
      {/* status kalau succes */}
      {status === "succeeded" && (
        <div key={todo.id}>
          <h3 className="font-bold text-3xl text-blue-400">{todo.title}</h3>
          <p
            className={`font-semibold text-lg ${
              todo.completed ? "text-green-600" : "text-red-500"
            }`}
          >
            Completed: {todo.completed ? "YES" : "NO"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ToDoComponents;
