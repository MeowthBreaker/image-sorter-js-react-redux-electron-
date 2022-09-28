import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setFilesInStorage } from "../filesSlice/thunks/setFilesInStorage";
import { LoadingStatus, SorterState } from "./types";
import { PageType } from "../pageSlice/types";
import { FileMeta } from "store/filesSlice/types";

const initialSorterState: SorterState = {
  status: "idle",
  files: [],
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
    removeCurrentFile: (state) => {
      state.files.pop();
    },
    uploadFiles: (state, action: PayloadAction<{files: FileMeta[]}>) => {
      state.files.push(...action.payload.files);
    },
  }
});

export const sorterReducer = sorterSlice.reducer;

export const { changeStatus, uploadFiles } = sorterSlice.actions;
