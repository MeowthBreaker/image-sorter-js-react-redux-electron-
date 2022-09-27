import { join } from "path/posix";

export const pathNormalizer = (folder: string, ext: string[], isDeep = false) =>
  join(
    folder,
    `${isDeep ? "**" : ""}/@(${ext.map((str) => `*.${str}`).join("|")})`
  ).replace(/\\/g, "/");
