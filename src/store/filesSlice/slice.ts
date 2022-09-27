import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageType } from "../pageSlice/types";
import { FilesState, File } from "./types";

const initialFiles: FilesState = {
  sorter: { files: [], processFiles: 0, overallFiles: 0 },
  duplicate: { files: [], processFiles: 0, overallFiles: 0 },
};

export const filesSlice = createSlice({
  name: "files",
  initialState: initialFiles,
  reducers: {
    setCurrentFolder: (
      state,
      action: PayloadAction<{ id: PageType; selectedFolder: string }>
    ) => {
      state[action.payload.id].currentFolder = action.payload.selectedFolder;
    },
    addFile: (state, action: PayloadAction<{ id: PageType; file: File }>) => {
      state[action.payload.id].files.push(action.payload.file);
    },
  },
});

export const filesReducer = filesSlice.reducer;

export const { setCurrentFolder } = filesSlice.actions;
