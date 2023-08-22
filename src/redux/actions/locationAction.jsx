import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/constant";

export const getLocation = createAsyncThunk(
  "getlocation",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(BASE_URL + "location");
      console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("http://localhost:3002/location", {
        ...data,
        id: Date.now(),
      });

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
