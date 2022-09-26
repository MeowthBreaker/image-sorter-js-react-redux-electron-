import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer as settings } from "./settingsSlice/slice";
import { pageReducer as page } from "./pageSlice/slice";
import { filesReducer as files } from "./filesSlice/slice";

export const storage = configureStore({
  reducer: {
    settings,
    page,
    files,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof storage.getState>;
