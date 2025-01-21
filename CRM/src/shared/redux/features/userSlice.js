import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPI } from "../api/data";

// Async actions
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await mockAPI.fetchUsers();
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  return await mockAPI.addUser(user);
});

export const editUser = createAsyncThunk("users/editUser", async (user) => {
  return await mockAPI.editUser(user);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  return await mockAPI.deleteUser(id);
});

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ id, password }) => {
    return await mockAPI.changePassword(id, password);
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // Edit User
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })

      // Change Password
      .addCase(changePassword.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index].password = action.payload.password;
        }
      });
  },
});

export default userSlice.reducer;
