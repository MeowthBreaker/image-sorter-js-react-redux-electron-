import React, { FC, useCallback, MouseEvent } from "react";
import { cn, CnProps } from "../../utils/cn";
import { getCurrentWindow } from "@electron/remote";

import { Icon } from "components/Icon/Icon";

import appIcon from "./images/BugAngry.jpg";
import sortIcon from "./images/sort.svg";
import compareIcon from "./images/compare.svg";
import settingsIcon from "./images/gear.svg";
import minimizeIcon from "./images/minimize.svg";
import fullScreenIcon from "./images/full-screen.svg";
import closeIcon from "./images/cross.svg";

import { useDispatch, useSelector } from "react-redux";
import { getPage } from "../../store/pageSlice/selectors";
import { changePage } from "../../store/pageSlice/slice";

import "./TopBar.css";

const cls = cn("top-bar");

const win = getCurrentWindow();

interface TopBarProps extends CnProps {}

export const TopBar: FC<TopBarProps> = ({ className }) => {
  const { currentPage } = useSelector(getPage);
  const dispatch = useDispatch();

  const close = useCallback((e: MouseEvent) => {
    e.preventDefault();
    win.close();
  }, []);

  const minimize = useCallback((e: MouseEvent) => {
    e.preventDefault();
    win.minimize();
  }, []);

  const maximize = useCallback((e: MouseEvent) => {
    e.preventDefault();
    win?.isMaximized() ? win?.unmaximize() : win?.maximize();
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
        <Icon
          className={cls("icon-app")}
          src={appIcon}
          hoverable={false}
          inverted={false}
        />
        <Icon
          className={cls("icon")}
          onClick={changeToSorter}
          src={sortIcon}
          active={currentPage === "sorter"}
          borderRadius="bookmark"
          color="dark"
        />
        <Icon
          className={cls("icon", {
            active: currentPage === "duplicate",
            type: "page-select",
          })}
          onClick={changeToDuplicate}
          src={compareIcon}
          active={currentPage === "duplicate"}
          borderRadius="bookmark"
          color="dark"
        />
        <Icon
          className={cls("icon")}
          src={settingsIcon}
          color="dark"
          borderRadius="oval"
        />
      </div>
      <div
        className={cls("draggable")}
      >{`ImageOrganizer - ${currentPage}`}</div>
      <div className={cls("right-side")}>
        <Icon
          className={cls("icon")}
          onClick={minimize}
          src={minimizeIcon}
          color="dark"
        />
        <Icon
          className={cls("icon")}
          onClick={maximize}
          src={fullScreenIcon}
          color="dark"
        />
        <Icon
          className={cls("icon")}
          onClick={close}
          src={closeIcon}
          color="dark"
        />
      </div>
    </div>
  );
};
