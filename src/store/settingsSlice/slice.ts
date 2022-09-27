import { createSlice } from "@reduxjs/toolkit";

import { SettingsState } from "./types";

const initialSettings: SettingsState = {
  sorter: {
    searchMethod: "deep",
    skipAction: "delete",
    allowedTypes: ["jpg", "png"],
    hotkeys: {
      skip: "Space",
      delete: "Delete",
      toggleFileBar: "F1",
      toggleDescription: "F2",
      loadProfile: "F9",
      saveProfile: "F5",
    },
  },
  duplicate: {
    searchMethod: "deep",
    compareGIFS: true,
    allowedTypes: ["jpg", "png"],
    hotkeys: {
      deleteLeft: "Numpad1",
      deleteRight: "Numpad3",
      deleteBoth: "Numpad2",
      falsePositive: "Numpad0",
      cancel: "NumpadDecimal",
    },
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    toggleCompareGIFS: (state) => {
      state.duplicate.compareGIFS = !state.duplicate.compareGIFS;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;

export const { toggleCompareGIFS } = settingsSlice.actions;
