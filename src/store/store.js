import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/counterSlice";
import todosReducer from "../reducer/todoSlice";
import todosByIdReducer from "../reducer/todoDynamicSlice";
import registerReducer from "../reducer/registerSlice";

// Custom middleware to save thee token
const saveTokenMiddleware = () => (next) => (action) => {
  if (action.type === "register/registerUser/fulfilled") {
    const response = action.payload;
    const token = response?.token;
    // save to token
    console.log("Middleeware Response", response);
    console.log("Middleware Token", token);
    // save token to localStorage
    localStorage.setItem("token", token);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    todosById: todosByIdReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saveTokenMiddleware),
});
