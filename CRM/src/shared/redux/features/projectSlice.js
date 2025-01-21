import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAPI } from '../api/data';

// Async Thunks
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  return await mockAPI.fetchProjects();
});

export const addProject = createAsyncThunk('projects/addProject', async (project) => {
  return await mockAPI.addProject(project);
});

export const editProject = createAsyncThunk('projects/editProject', async (project) => {
  return await mockAPI.editProject(project);
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
  return await mockAPI.deleteProject(id);
});

// Slice
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Project
      .addCase(addProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);  // Add the newly created project to the list
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Edit Project
      .addCase(editProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(editProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = state.projects.filter((project) => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;





