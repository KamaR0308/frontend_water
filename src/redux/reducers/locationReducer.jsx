import { createSlice } from "@reduxjs/toolkit";
import { createLocation, getLocation } from "../actions/locationAction";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
    error: false,
    isLoading: false,
  },
  reducers: {
    removelocation: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateLocation: (state, action) => {
      const { id, updateUser } = action.payload;
      const user = state.users.find((user) => user.id === id);

      if (user && updateUser) {
        Object.assign(user, updateUser);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.locations = action.payload;
      })
      .addCase(getLocation.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.locations = []; // Сбрасываем текущих пользователей при начале запроса
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.locations = [];
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.locations.push(action.payload);
      })
      .addCase(createLocation.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addlocation, removelocation, updateLocation } =
  locationSlice.actions;

export default locationSlice.reducer;
