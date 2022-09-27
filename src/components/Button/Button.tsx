import React, { FC, ReactNode, HTMLAttributes } from "react";
import { cn, CnProps } from "../../utils/cn";

import "./Button.css";

const cls = cn("button");

interface ButtonProps extends CnProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cls(null, [className])}>
      {children}
    </div>
  );
};
