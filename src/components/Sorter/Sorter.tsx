import React from "react";
import { cn } from "../../utils/cn";

import { Button } from "../Button/Button";

import './Sorter.css';

const cls = cn("sorter");


export const Sorter = () => {
  return (
    <div className={cls()}>
      <div className={cls("bar")}>
        <div className={cls("bar-buttons")}>
          <Button className={cls("change-folder")}>Change Folder</Button>
          <Button className={cls("load-profile")}>Load Profile</Button>
          <Button className={cls("save-profile")}>Save Folder</Button>
        </div>
        <div className={cls("info-button")}></div>
      </div>
    </div>
  );
};
