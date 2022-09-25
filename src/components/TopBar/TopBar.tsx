import React, {FC} from "react";

import { cn, CnProps } from "../../utils/cn";


const cls = cn("top-bar");

interface TopBarProps extends CnProps {
}

export const TopBar: FC<TopBarProps> = ({className}) => {
  return <div className={cls()}>

  </div>;
};
