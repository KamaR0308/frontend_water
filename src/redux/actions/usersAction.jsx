import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/constant";
// В actions/usersAction.js
export const getUsers = createAsyncThunk("users/getUsers", async (_, thunkApi) => {
    try {
      const response = await axios.get(BASE_URL + "users");
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  });


  
  export const createUser = createAsyncThunk(
    "users/createUser",
    async ({ user, production }, thunkApi) => {
      try {
        const data = {
          name: user,
          product: production,
          uuid: Date.now(),
        };
        const response = await axios.post("http://localhost:3002/users", data);
        
        return response.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );
  