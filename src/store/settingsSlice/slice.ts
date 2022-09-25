import { createSlice } from "@reduxjs/toolkit";

import { SettingsState } from "./types";

const initialSettings: SettingsState = {
  sorterSettings: {
    searchMethod: "deep",
    skipAction: "delete",
  },
  duplicateSettings: {
    compareGIFS: true,
    allowedTypes: ["jpg", "png"],
  },
  hotkeysSettings: {
    sorter: {
      skip: "Space",
      delete: "Delete",
      toggleFileBar: "F1",
      toggleDescription: "F2",
      loadProfile: "F9",
      saveProfile: "F5",
    },
    duplicate: {
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
      state.duplicateSettings.compareGIFS =
        !state.duplicateSettings.compareGIFS;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;

export const { toggleCompareGIFS } = settingsSlice.actions;
