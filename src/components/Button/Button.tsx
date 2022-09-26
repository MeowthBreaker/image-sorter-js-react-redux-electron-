import React, { FC, ReactNode } from 'react';
import { cn, CnProps } from '../../utils/cn';

import "./Button.css";

const cls = cn('button');

interface ButtonProps extends CnProps {
  children?: ReactNode;
  className?: string;
};

export const Button: FC<ButtonProps> = ({children, className}) => {
  return (
    <div className={cls(null, [className])}>
      {children}
    </div>
  );
};