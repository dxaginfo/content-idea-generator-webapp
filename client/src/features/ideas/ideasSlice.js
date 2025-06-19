import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ideasService from './ideasService';

const initialState = {
  ideas: [],
  savedIdeas: [],
  currentIdea: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
};

// Generate ideas
export const generateIdeas = createAsyncThunk(
  'ideas/generate',
  async (formData, thunkAPI) => {
    try {
      return await ideasService.generateIdeas(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to generate ideas';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Save idea
export const saveIdea = createAsyncThunk(
  'ideas/save',
  async (ideaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ideasService.saveIdea(ideaData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to save idea';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get saved ideas
export const getSavedIdeas = createAsyncThunk(
  'ideas/getSaved',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ideasService.getSavedIdeas(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch ideas';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete idea
export const deleteIdea = createAsyncThunk(
  'ideas/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ideasService.deleteIdea(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete idea';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    clearIdeas: (state) => {
      state.ideas = [];
    },
    setCurrentIdea: (state, action) => {
      state.currentIdea = action.payload;
    },
    resetStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateIdeas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateIdeas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ideas = action.payload;
      })
      .addCase(generateIdeas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(saveIdea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveIdea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedIdeas.push(action.payload);
      })
      .addCase(saveIdea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getSavedIdeas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavedIdeas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedIdeas = action.payload;
      })
      .addCase(getSavedIdeas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(deleteIdea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIdea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedIdeas = state.savedIdeas.filter((idea) => idea._id !== action.payload.id);
      })
      .addCase(deleteIdea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { clearIdeas, setCurrentIdea, resetStatus } = ideasSlice.actions;
export default ideasSlice.reducer;
