import { promisify } from "util";
import { glob } from "glob";
import { join } from "path/posix";
import { imageSize } from "image-size";
import { FileMeta, FileType } from "../types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getFiles } from "../selectors";
import { RootState } from "../../storage";
import { getSettings } from "../../settingsSlice/selectors";
import { getCurrentPage } from "../../pageSlice/selectors";
import { pathNormalizer } from "utils/pathNormalizer";
import {
  addFile,
  clearStorage,
  updateOverallFiles,
} from "store/filesSlice/slice";
import { uploadFiles } from "store/sorterSlice/slice";

const pGlob = promisify(glob);
const pImageSize = promisify(imageSize);

export const setFilesInStorage = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("files/setFilesInStorage", async (__: any, { getState, dispatch }) => {
  const state = getState();
  const currentPage = getCurrentPage(state);

  const files = getFiles(state);
  const settings = getSettings(state)[currentPage];

  if (files.currentFolder) {
    try {
      const foundFiles = await pGlob(
        pathNormalizer(
          files.currentFolder,
          settings.allowedTypes,
          settings.searchMethod === "deep"
        )
      );

      dispatch(
        updateOverallFiles({ id: currentPage, files: foundFiles.length })
      );

      await Promise.all(
        foundFiles.map(async (file) => {
          const imageData = await pImageSize(file);
          const imageName = file.slice(file.lastIndexOf("/") + 1);

          dispatch(
            addFile({
              id: currentPage,
              file: {
                name: imageName,
                extension: imageData!.type as FileType,
                originalPath: file,
                movedPath: null,
                width: imageData!.width + "px",
                height: imageData!.height + "px",
              },
            })
          );
        })
      );


      if (currentPage === "sorter") {
        dispatch(uploadFiles({files: getState().files.sorter.files}));
        dispatch(clearStorage({ id: "sorter" }));
      }
    } catch (error) {
      console.error(error);
    }
  }
});
