import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentPage } from "store/pageSlice/selectors";
import { PageType } from "../pageSlice/types";
import { setFilesInStorage } from "./thunks/setFilesInStorage";
import { FilesState, FileMeta } from "./types";

const initialFiles: FilesState = {
  sorter: { files: [], processedFiles: 0, overallFiles: 0 },
  duplicate: { files: [], processedFiles: 0, overallFiles: 0 },
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
    addFile: (
      state,
      action: PayloadAction<{ id: PageType; file: FileMeta }>
    ) => {
      state[action.payload.id].files.push(action.payload.file);
      state[action.payload.id].processedFiles += 1;
    },
    removeFile: (state, action: PayloadAction<{ id: PageType }>) => {
      state[action.payload.id].files.pop();
    },
    clearStorage: (state, action: PayloadAction<{ id: PageType }>) => {
      state[action.payload.id].files.length = 0;
      state[action.payload.id].processedFiles = 0;
      state[action.payload.id].overallFiles = 0;
    },
    updateOverallFiles: (
      state,
      action: PayloadAction<{ id: PageType; files: number }>
    ) => {
      state[action.payload.id].overallFiles = action.payload.files;
    },
  }
});

export const filesReducer = filesSlice.reducer;

export const { setCurrentFolder, addFile, clearStorage, updateOverallFiles } =
  filesSlice.actions;
