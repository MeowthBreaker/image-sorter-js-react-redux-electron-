import React, { FC, HTMLAttributes, ReactNode } from "react";
import { cn, CnProps } from "utils/cn";
import "./Icon.css";

const cls = cn("icon");

type ColorTypes = "light" | "dark";
type BorderRadiusType = "bookmark" | "oval" | "drop";

interface IconProps extends CnProps, HTMLAttributes<HTMLDivElement> {
  src?: string;
  children?: ReactNode;
  color?: ColorTypes;
  active?: boolean;
  inverted?: boolean;
  borderRadius?: BorderRadiusType;
  hoverable?: boolean;
}

export const Icon: FC<IconProps> = ({
  src,
  className,
  children,
  active,
  color,
  inverted = color === "dark",
  borderRadius: border,
  hoverable = true,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls({ border, color, active, inverted, hoverable }, [
        className,
      ])}
    >
      {src && <img src={src} className={cls("image")} />}
      {children}
    </div>
  );
};
