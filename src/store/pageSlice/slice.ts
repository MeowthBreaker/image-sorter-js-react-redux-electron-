import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageState, PageType } from "./types";

const initialPage: PageState = {
  currentPage: "sorter",
};

export const pageSlice = createSlice({
  name: 'page',
  initialState: initialPage,
  reducers: {
    changePage: (state, action: PayloadAction<PageType>) => {
      state.currentPage = action.payload
    },
  },
});

export const pageReducer = pageSlice.reducer;

export const { changePage } = pageSlice.actions;
