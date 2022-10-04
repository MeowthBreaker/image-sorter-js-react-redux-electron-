import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { getSorter } from "store/sorterSlice/selectors";
import { shell } from "@electron/remote";
import folderIcon from "./folder.svg";
import { trunkString } from "utils/trunkString";

import { cn, CnProps } from "utils/cn";

import "./InfoTab.css";

const cls = cn("info-tab");

interface InfoTabProps extends CnProps {
  active: boolean;
}

export const InfoTab: FC<InfoTabProps> = ({ className, active }) => {
  const currentFile = useSelector(getSorter).currentFile;

  const openCurrentPath = useCallback(() => {
    if (currentFile?.originalPath) {
      const path = currentFile.originalPath.replace(/\//g, "\\");
      shell.showItemInFolder(path);
    }
  }, [currentFile]);

  return (
    <div className={cls({ active })}>
      <div className={cls("line")}>{`Name: ${currentFile?.name && trunkString(currentFile.name, 25)}`}</div>
      <div className={cls("line")}>{`Extension: ${
        currentFile?.extension && trunkString(currentFile.extension, 20)
      }`}</div>
      <div className={cls("line", { location: true })}>
        {`Location: ${currentFile?.originalPath && trunkString(currentFile.originalPath, 20)}`}
        <div className={cls("location-folder")} onClick={openCurrentPath}>
          <img src={folderIcon} />
        </div>
      </div>
      <div className={cls("line")}>{`Width: ${currentFile?.width ? trunkString(currentFile.width, 25) : "0px"}`}</div>
      <div className={cls("line")}>{`Height: ${
        currentFile?.height ? trunkString(currentFile.height, 25) : "0px"
      }`}</div>
    </div>
  );
};
