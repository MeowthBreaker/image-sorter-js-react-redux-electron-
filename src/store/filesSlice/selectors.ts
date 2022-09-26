import { RootState } from "../storage";

export const getFiles = (state: RootState) =>
  state.files[state.page.currentPage];
