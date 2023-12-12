import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fetching data to do
export const fetchToDo = createAsyncThunk("todos/fetchToDo", async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  const data = await response.json();
  return data;
});


// slice / reducers
const todosSlice = createSlice({
  // naama state
  name: "todos",
  initialState: {
    // state data todos
    todo: {},
    status: "idle",
    error: null,
  },
  //reducer sync
  reducers: {},
  // reducer async
  extraReducers: (builder) => {
    builder
      // ini untuk loading, simpan ke state status
      .addCase(fetchToDo.pending, (state) => {
        state.status = "loading";
      })
      // untuk succes, simopan ke state 'satus'
      // ini untuk data, simpan ke state 'todo'
      .addCase(fetchToDo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })

      // ini untuk fail, simpan ke state "status"
      // ini untuk error, simpoan ke state 'error
      .addCase(fetchToDo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default todosSlice.reducer;
