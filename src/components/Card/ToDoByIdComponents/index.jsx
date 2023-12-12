import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import ErrorComponent from "../Error";
import { fetchToDoById } from "../../../reducer/todoDynamicSlice";

function ToDoComponentById() {
  const dispatch = useDispatch();
  // todo ini untuk data
  const todo = useSelector((state) => state.todosById.todo);
  // todo ini untuk loading
  const status = useSelector((state) => state.todosById.status);
  // todo ini untuk error
  const error = useSelector((state) => state.todosById.error);

  // state untuk simpan value input
  const [input, setInput] = useState();
  // triger untuk simpan input ke function supaya fetch data
  const handleFetchClick = () => {
    // input data value
    if (input) {
      // dispatch fetch To Do dg params input
      dispatch(fetchToDoById(input));
    }
  };

  console.log("todo byid", todo);
  console.log("status byid", status);
  console.log("error byid", error);
  // early return untuk loafding
  if (status === "loading") return <Loading />;
  // early return untuk error
  if (status === "failed") return <ErrorComponent message={error} />;
  return (
    <div className="mt-8 mx-auto">
      {/* input todo By Id */}
      <div className="bg-white p-8 max-w-xs w-full rounded-lg mb-8">
        <input
          type="number"
          placeholder="Enter To Do Id"
          className="border border-gray-400 p-2 rounded-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="bg-blue-300 p-2 w-full mt-4 rounded-md"
          onClick={handleFetchClick}
        >
          Fetch To Do
        </button>
      </div>
      {/* return untuk succes */}
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

export default ToDoComponentById;
