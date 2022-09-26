import React from "react";
import { TopBar } from "../TopBar/TopBar";
import "./App.css";

import '../../vars.css';
import { cn } from "../../utils/cn";

const cls = cn('theme');

function App() {
  return (
    <div className={cls({type: 'light'})}>
      <TopBar></TopBar>
    </div>
  );
}

export default App;
