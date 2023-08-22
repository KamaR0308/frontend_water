import { createSlice } from "@reduxjs/toolkit";
import { getLocation } from "../actions/locationAction";
import { createUser, getUsers } from "../actions/usersAction";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: false,
    isLoading: false,
  },
  reducers: {
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, updateUser } = action.payload;
      const user = state.users.find((user) => user.id === id);

      if (user && updateUser) {
        Object.assign(user, updateUser);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.users = []; // Сбрасываем текущих пользователей при начале запроса
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.users = [];
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users.push(action.payload);
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  
});
export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
