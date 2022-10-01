import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { cn } from "../../utils/cn";
import { dialog } from "@electron/remote";

import { Oval } from "react-loader-spinner";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Icon } from "components/Icon/Icon";
import { LocalImage } from "components/LocalImage/LocalImage";
import info from "./images/info.svg";

import { getSorter } from "../../store/sorterSlice/selectors";
import { clearStorage, setCurrentFolder } from "../../store/filesSlice/slice";
import { setFilesInStorage } from "../../store/filesSlice/thunks/setFilesInStorage";
import { LoadingStatus } from "store/sorterSlice/types";
import { getFiles } from "store/filesSlice/selectors";

import "./Sorter.css";
import { setCurrentFile } from "store/sorterSlice/slice";
import { moveFile } from "store/sorterSlice/thunks/moveFile";
import { useAppDispatch } from "store/hooks";
import { retrieveFile } from "store/sorterSlice/thunks/retrieveFile";

const cls = cn("sorter");

export const Sorter = () => {
  const sorterState = useSelector(getSorter);
  const filesState = useSelector(getFiles);
  const dispatch = useAppDispatch();

  const setFolder = useCallback(async () => {
    dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then(async (result) => {
        if (result.filePaths.length) {
          dispatch(
            setCurrentFolder({
              id: "sorter",
              selectedFolder: result.filePaths[0],
            })
          );
          dispatch(clearStorage({ id: "sorter" }));

          await dispatch(setFilesInStorage());
          dispatch(setCurrentFile());
        }
      })
      .catch(console.error);
  }, [dispatch]);

  const onMoveFile = useCallback(async () => {
    await dispatch(
      moveFile({
        from: sorterState.currentFile!.originalPath,
        to: `C:/Users/Bugama/Desktop/meow/${sorterState.currentFile!.originalPath.slice(
          sorterState.currentFile!.originalPath.lastIndexOf("/") + 1
        )}`,
      })
    );
    dispatch(setCurrentFile());
  }, [dispatch, sorterState]);

  const onRetrieveFile = useCallback(async () => {
    if (sorterState.movedFiles.length === 0) return;

    await dispatch(retrieveFile());
    dispatch(setCurrentFile());
  }, [dispatch, sorterState]);

  return (
    <div className={cls()}>
      {sorterState.status === ("loading" as LoadingStatus) && (
        <Modal>
          <Oval height={250} width={250} color="blue" secondaryColor="white" />
          <div className={cls("progress")}>
            {filesState.processedFiles}/{filesState.overallFiles}
          </div>
        </Modal>
      )}
      <div className={cls("bar")}>
        <div className={cls("bar-buttons")}>
          <Button className={cls("change-folder")} onClick={setFolder}>
            Select Folder
          </Button>
          <Button className={cls("load-profile")}>Load Profile</Button>
          <Button className={cls("save-profile")}>Save Folder</Button>
          <Button onClick={onMoveFile}>Move</Button>
          <Button onClick={onRetrieveFile}>Retrieve</Button>
        </div>
        <Icon
          src={info}
          className={cls("info-button")}
          color="light"
          borderRadius="oval"
        />
      </div>
      <div className={cls("image-container")}>
        {sorterState.currentFile && (
          <LocalImage
            path={sorterState.currentFile?.originalPath}
            className={cls("image")}
          />
        )}
      </div>
      <div className={cls("directories-container")}></div>
    </div>
  );
};
