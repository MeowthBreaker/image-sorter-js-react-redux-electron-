import { promisify } from "util";
import { glob } from "glob";
import { join } from "path/posix";
import { imageSize } from "image-size";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getFiles } from "../../filesSlice/selectors";
import { RootState } from "../../storage";
import { getSettings } from "../../settingsSlice/selectors";
import { getCurrentPage } from "../../pageSlice/selectors";
import { pathNormalizer } from "../../../utils/pathNormalizer";

const pGlob = promisify(glob);
const pImageSize = promisify(imageSize);

export const setFilesInStorage = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("sorter/setFilesInStorage", async (__: any, { getState, dispatch }) => {
  const state = getState();
  const currentPage = getCurrentPage(state);

  const files = getFiles(state);
  const settings = getSettings(state)[currentPage];

  if (files.currentFolder) {
    const foundFiles = await pGlob(
      pathNormalizer(
        files.currentFolder,
        settings.allowedTypes,
        settings.searchMethod === "deep"
      )
    );

    console.log(foundFiles);

    console.log(
      await Promise.all(
        foundFiles.map((file) => {
          return pImageSize(file);
        })
      )
    );
  }
});
