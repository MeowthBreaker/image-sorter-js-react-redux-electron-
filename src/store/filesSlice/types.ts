import { PageType } from "../pageSlice/types";

export type FileType = "jpg" | "jpeg" | "png" | "webp" | "gif";

export interface File {
  name: string;
  extension: FileType;
  path: string;
  width: string;
  height: string;
}

export interface FilesData {
  files: File[];
  processFiles: number;
  overallFiles: number;
  currentFolder?: string | null;
}

export type FilesDataType = PageType;

export type FilesState = Record<FilesDataType, FilesData>;
