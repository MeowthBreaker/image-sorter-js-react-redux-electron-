import { FileMeta } from "store/filesSlice/types";

export type LoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface SorterState {
  status: LoadingStatus;
  files: FileMeta[];
}
