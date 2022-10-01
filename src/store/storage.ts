import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer as settings } from "./settingsSlice/slice";
import { pageReducer as page } from "./pageSlice/slice";
import { filesReducer as files } from "./filesSlice/slice";
import { sorterReducer as sorter } from "./sorterSlice/slice";


export const storage = configureStore({
  reducer: {
    settings,
    page,
    files,
    sorter,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof storage.getState>;

export type AppDispatch = typeof storage.dispatch;