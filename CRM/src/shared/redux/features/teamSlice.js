import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPI } from "../api/data";

// Async Thunks
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  return await mockAPI.fetchTeams();
});

export const addTeam = createAsyncThunk("teams/addTeam", async (team) => {
  return await mockAPI.addTeam(team);
});

export const editTeam = createAsyncThunk("teams/editTeam", async (team) => {
  return await mockAPI.editTeam(team);
});

export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (id) => {
  return await mockAPI.deleteTeam(id);
});

// Slice
const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Teams
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add Team
      .addCase(addTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams.push(action.payload); // Add the newly created team to the list
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Edit Team
      .addCase(editTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.teams.findIndex(
          (team) => team.id === action.payload.id
        );
        if (index !== -1) {
          state.teams[index] = {
            ...state.teams[index],
            name: action.payload.name,
          };
        }
      })
      .addCase(editTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete Team
      .addCase(deleteTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = state.teams.filter((team) => team.id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;
