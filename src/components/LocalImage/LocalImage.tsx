import React, { FC, useEffect, useState } from "react";
import { CnProps } from "utils/cn";
import { readFile } from "fs/promises";

interface LocalImageProps extends CnProps {
  path: string;
}

export const LocalImage: FC<LocalImageProps> = ({ path, className }) => {
  const [src, setSrc] = useState<null | string>(null);

  useEffect(() => {
    readFile(path).then((buffer) => {
      setSrc(URL.createObjectURL(new File([buffer], path)));
    });
  }, [path]);

  return src ? <img src={src} /> : <img alt='meow'/>;
};
