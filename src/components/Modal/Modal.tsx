import React, { FC, ReactNode } from "react";
import { cn, CnProps } from "../../utils/cn";

import "./Modal.css";

const cls = cn("modal");

interface ModalProps extends CnProps {
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, className }) => {
  return <div className={cls(null, [className])}>{children}</div>;
};
