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

const cls = cn("sorter");

export const Sorter = () => {
  const sorterState = useSelector(getSorter);
  const filesState = useSelector(getFiles);
  const dispatch = useDispatch();

  const setFolder = useCallback(() => {
    dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then((result) => {
        if (result.filePaths.length) {
          dispatch(
            setCurrentFolder({
              id: "sorter",
              selectedFolder: result.filePaths[0],
            })
          );
          dispatch(clearStorage({ id: "sorter" }));
          // @ts-ignore
          dispatch(setFilesInStorage());
        }
      })
      .catch(console.error);
  }, [dispatch]);

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
        </div>
        <Icon
          src={info}
          className={cls("info-button")}
          color="light"
          borderRadius="oval"
        />
      </div>
      <div className={cls("image-container")}>
        {sorterState.files.length > 0 && <LocalImage
          path={sorterState.files[sorterState.files.length - 1].path}
          className={cls("image")}
        />}
      </div>
      <div className={cls("directories-container")}></div>
    </div>
  );
};
