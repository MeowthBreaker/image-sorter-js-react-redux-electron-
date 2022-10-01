import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentPage } from "store/pageSlice/selectors";
import { RootState } from "store/storage";
import { afterRetrieve, setCurrentFile, uploadFiles } from "../slice";
import { moveFile } from "./moveFile";

export const retrieveFile = createAsyncThunk<void, void, { state: RootState }>(
  "sorter/retrieveFile",
  async (__: any, { getState, dispatch }) => {
    try {
      const sorterState = getState().sorter;

      if (!sorterState.movedFiles.length) return;

      const file = sorterState.movedFiles[sorterState.movedFiles.length - 1];

      if (file?.movedPath !== null)
        await dispatch(
          moveFile({
            from: file.movedPath,
            to: file.originalPath,
            action: "retrive",
          })
        );

      await dispatch(afterRetrieve());
    } catch (error) {
      console.error(error);
    }
  }
);
