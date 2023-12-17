import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// representasi ini buat apa
export const fetchRegisterUser = createAsyncThunk(
    // namanyaa
  "register/registerUser",
  // function async dg param user data
  async (userData) => {
    //try catch untuk check func bener/ salah
    try {
      const response = await fetch("https://reqres.in/api/register", {
        // methode base on API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // isi body, sesuai API. biasanya JSON String
        body: JSON.stringify(userData),
      });
      //cek respon
      if (!response.ok) {
        // save to local storage
        throw new Error("login Fail");
      }
      // respon sukses ?
      console.log("response oke / berhasil");
      const data = await response.json();
      return data;
    } catch (error) {
      // handle error
      console.log("error di try catch", error);
      throw error;
    }
  }
);
const registerSlice = createSlice({
  name: "register",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.response = action.payload);
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  },
});
export default registerSlice.reducer;
