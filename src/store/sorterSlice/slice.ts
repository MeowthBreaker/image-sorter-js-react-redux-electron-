import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setFilesInStorage } from "../filesSlice/thunks/setFilesInStorage";
import { LoadingStatus, SorterState } from "./types";
import { PageType } from "../pageSlice/types";
import { FileMeta } from "store/filesSlice/types";

const initialSorterState: SorterState = {
  status: "idle",
  files: [],
  movedFiles: [],
  currentFile: null,
};

export const sorterSlice = createSlice({
  name: "sorter",
  initialState: initialSorterState,
  reducers: {
    changeStatus: (
      state,
      action: PayloadAction<{ id: PageType; currentStatus: LoadingStatus }>
    ) => {
      state.status = action.payload.currentStatus;
    },
    uploadFiles: (state, action: PayloadAction<{ files: FileMeta[] }>) => {
      state.files.push(...action.payload.files);
    },
    setCurrentFile: (state) => {
      if (state.files.length > 0) state.currentFile = state.files.pop()!;
      else state.currentFile = null;
    },
    afterMove: (state, action: PayloadAction<{ movedPath: string }>) => {
      if (state.currentFile) {
        state.currentFile.movedPath = action.payload.movedPath;
        state.movedFiles.push(state.currentFile);
      }
    },
    markFileForDeletion: () => {},
    deleteFiles: () => {},
    afterRetrieve: (state) => {
      const file = state.movedFiles.pop();

      if (!file?.movedPath) return;

      if (state.currentFile) state.files.push(state.currentFile);

      file.movedPath = null;

      state.files.push(file);
    },
  },
});

export const sorterReducer = sorterSlice.reducer;

export const {
  changeStatus,
  uploadFiles,
  setCurrentFile,
  markFileForDeletion,
  afterMove,
  deleteFiles,
  afterRetrieve,
} = sorterSlice.actions;
