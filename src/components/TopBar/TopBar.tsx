import React, { FC, useCallback, MouseEvent } from "react";
// import { ipcRenderer } from "electron";

import { cn, CnProps } from "../../utils/cn";

import appIcon from "./images/BugAngry.jpg";
import sortIcon from "./images/sort.svg";
import compareIcon from "./images/compare.svg";
import settingsIcon from "./images/gear.svg";
import minimizeIcon from "./images/minimize.svg";
import fullScreenIcon from "./images/full-screen.svg";
import closeIcon from "./images/cross.svg";

import "./TopBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../../store/pageSlice/selectors";
import { changePage } from "../../store/pageSlice/slice";
// import { ipcRenderer } from "electron/renderer";

const cls = cn("top-bar");

const ipc = window.require("electron").ipcRenderer;

interface TopBarProps extends CnProps {}

export const TopBar: FC<TopBarProps> = ({ className }) => {
  const { currentPage } = useSelector(getPage);
  const dispatch = useDispatch();

  const close = useCallback((e: MouseEvent) => {
    e.preventDefault();
    ipc.send("closeApp");
  }, []);

  const minimize = useCallback((e: MouseEvent) => {
    e.preventDefault();
    ipc.send("minimizeApp");
  }, []);

  const maximize = useCallback((e: MouseEvent) => {
    e.preventDefault();
    ipc.send("maximizeApp");
  }, []);

  const changeToSorter = useCallback(
    () => dispatch(changePage("sorter")),
    [dispatch]
  );
  const changeToDuplicate = useCallback(
    () => dispatch(changePage("duplicate")),
    [dispatch]
  );

  return (
    <div className={cls()}>
      <div className={cls("left-side")}>
        <div className={cls("icon", { type: "app" })}>
          <img src={appIcon} />
        </div>
        <div
          className={cls("icon", {
            active: currentPage === "sorter",
            type: "page-select",
          })}
          onClick={changeToSorter}
        >
          <img src={sortIcon} />
        </div>
        <div
          className={cls("icon", {
            active: currentPage === "duplicate",
            type: "page-select",
          })}
          onClick={changeToDuplicate}
        >
          <img src={compareIcon} />
        </div>
        <div className={cls("icon")}>
          <img src={settingsIcon} />
        </div>
      </div>
      <div
        className={cls("draggable")}
      >{`ImageOrganizer - ${currentPage}`}</div>
      <div className={cls("right-side")}>
        <div className={cls("icon")} onClick={minimize}>
          <img src={minimizeIcon} />
        </div>
        <div className={cls("icon")} onClick={maximize}>
          <img src={fullScreenIcon} />
        </div>
        <div className={cls("icon")} onClick={close}>
          <img src={closeIcon} />
        </div>
      </div>
    </div>
  );
};
