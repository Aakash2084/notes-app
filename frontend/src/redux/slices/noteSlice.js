import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { act } from "react";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/note");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, thunkAPI) => {
    try {
      const response = await api.post("/note", noteData);

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/note/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, noteData }, thunkAPI) => {
    try {
      const response = await api.put(`/note/${id}`, noteData);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.notes = state.notes.map((note) => {
          note._id === action.payload._id ? action.payload : note;
        });
      });
  },
});

export default noteSlice.reducer;
