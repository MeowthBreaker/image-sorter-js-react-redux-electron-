import { RootState } from "../storage";

export const getPage = (state: RootState) => state.page;

export const getCurrentPage = (state: RootState) => getPage(state).currentPage