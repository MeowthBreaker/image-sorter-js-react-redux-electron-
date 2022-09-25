import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer as settings } from "./settingsSlice/slice";

export const storage = configureStore({
  reducer: {
    settings
  },
  devTools: true,
});

export type RootState = ReturnType<typeof storage.getState>
