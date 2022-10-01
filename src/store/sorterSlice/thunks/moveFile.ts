import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store/storage";
import { afterMove, setCurrentFile } from "../slice";
import * as fs from "fs/promises";

type ActionType = "move" | "retrive";

interface MoveFileArgs {
  from: string;
  to: string;
  action?: ActionType;
}

export const moveFile = createAsyncThunk<
  void,
  MoveFileArgs,
  { state: RootState }
>(
  "sorter/moveFile",
  async ({ from, to, action = "move" }, { getState, dispatch }) => {
    try {
      const sorterState = getState().sorter;

      console.log(from, to);
      // await fs.access(from, fs.constants.F_OK);
      fs.rename(from, to);


      if (action === "move") {
        dispatch(afterMove({ movedPath: to }));
      }
    } catch (error) {
      console.error(error);
    }
  }
);
