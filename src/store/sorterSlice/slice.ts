import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SorterState } from "./types";

const initialSorterState: SorterState = {
  sorterModal: { isModalActive: false },
};

export const sorterSlice = createSlice({
  name: "sorter",
  initialState: initialSorterState,
  reducers: {
    setModalActive: (state, action: PayloadAction<boolean>) => {
      state.sorterModal.isModalActive = action.payload;
    },
  },
});

export const sorterReducer = sorterSlice.reducer;

export const { setModalActive } = sorterSlice.actions;
