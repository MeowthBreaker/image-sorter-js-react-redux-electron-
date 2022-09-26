import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { getPage } from "../../store/pageSlice/selectors";

import "../../vars.css";
import { cn } from "../../utils/cn";

import { TopBar } from "../TopBar/TopBar";
import { Sorter } from "../Sorter/Sorter";
import { Duplicate } from "../Duplicate/Duplicate";

const theme = cn("theme");
const cls = cn("app");

function App() {
  const { currentPage } = useSelector(getPage);
  return (
    <div className={theme({ type: "light" }, [cls()])}>
      <TopBar />
      <div className={cls("content")}>
        {currentPage === "sorter" && <Sorter />}
        {currentPage === "duplicate" && <Duplicate />}
      </div>
    </div>
  );
}

export default App;
