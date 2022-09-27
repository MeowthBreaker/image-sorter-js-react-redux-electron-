import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSorter } from "../../store/sorterSlice/selectors";
import { setModalActive } from "../../store/sorterSlice/slice";
import { cn } from "../../utils/cn";
import * as electron from "electron";
import { getCurrentWindow, dialog } from "@electron/remote";
import * as fs from "fs";
import { Oval } from "react-loader-spinner";

import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";

import "./Sorter.css";
import { setCurrentFolder } from "../../store/filesSlice/slice";
import { setFilesInStorage } from "../../store/sorterSlice/thunks/setFilesInStorage";

const cls = cn("sorter");

export const Sorter = () => {
  const sorterState = useSelector(getSorter);
  const dispatch = useDispatch();

  const closeModal = useCallback(
    () => dispatch(setModalActive(false)),
    [dispatch]
  );

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
          // dispatch(setModalActive(true));
          // @ts-ignore
          dispatch(setFilesInStorage());
        }
      })
      .catch(console.error);
  }, [dispatch]);

  return (
    <div className={cls()}>
      {sorterState.sorterModal.isModalActive && (
        <Modal>
          <div className={cls("modal-buttons")}>
            <Button>Start</Button>
            <Button>Stop</Button>
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
        <div className={cls("info-button")}></div>
      </div>
    </div>
  );
};
