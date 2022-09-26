import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilesState, File } from "./types";

const initialFiles: FilesState = {
  sorter: {files: []},
  duplicate: {files: []},
};

export const filesSlice = createSlice({
  name: 'files',
  initialState: initialFiles,
  reducers: {

  },
});

export const filesReducer = filesSlice.reducer;

export const { } = filesSlice.actions;
