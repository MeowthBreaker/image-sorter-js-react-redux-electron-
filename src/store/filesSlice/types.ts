import { PageType } from "../pageSlice/types";

export type FileType = "jpg" | "jpeg" | "png" | "webp" | "gif";

export interface FileMeta {
  name: string;
  extension: FileType;
  path: string;
  width: string;
  height: string;
}

export interface FilesData {
  files: FileMeta[];
  processedFiles: number;
  overallFiles: number;
  currentFolder?: string | null;
}

export type FilesDataType = PageType;

export type FilesState = Record<FilesDataType, FilesData>;
