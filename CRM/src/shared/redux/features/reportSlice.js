// reportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockAPI } from "../api/data";

// Fetch Reports, Projects ve Users için Async Thunks
export const fetchReports = createAsyncThunk("reports/fetchReports", async () => {
  return await mockAPI.fetchReports();
});

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  return await mockAPI.fetchProjects();
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await mockAPI.fetchUsers();
});

// Add/Edit/Delete 
export const addReport = createAsyncThunk("reports/addReport", async (report) => {
  return await mockAPI.addReport(report);
});

export const editReport = createAsyncThunk("reports/editReport", async (report) => {
  return await mockAPI.editReport(report);
});

export const deleteReport = createAsyncThunk("reports/deleteReport", async (id) => {
  return await mockAPI.deleteReport(id);
});

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    projects: [], 
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reports
      .addCase(fetchReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Projects 
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      
      // Users 
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      
      // Add, Edit, Delete 
      .addCase(addReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
      })
      .addCase(editReport.fulfilled, (state, action) => {
        const index = state.reports.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter((r) => r.id !== action.payload);
      });
  },
});

export default reportSlice.reducer;


