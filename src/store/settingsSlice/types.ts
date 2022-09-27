import { PageType } from "../pageSlice/types";

type AllowedImageTypes = "jpg" | "jpeg" | "png";

export interface BaseSettings {
  searchMethod: "on top" | "deep";
  allowedTypes: AllowedImageTypes[];
}

export interface SorterHotkeys {
  skip: string;
  delete: string;
  toggleFileBar: string;
  toggleDescription: string;
  loadProfile: string;
  saveProfile: string;
}

export interface DuplicateHotKeys {
  deleteLeft: string;
  deleteRight: string;
  deleteBoth: string;
  falsePositive: string;
  cancel: string;
}

export interface SorterSettings extends BaseSettings {
  skipAction: "delete" | "folder";
  hotkeys: SorterHotkeys;
}

export interface DuplicateSettings extends BaseSettings {
  compareGIFS: boolean;
  hotkeys: DuplicateHotKeys;
}

export interface SettingsState extends Record<PageType, BaseSettings> {
  sorter: SorterSettings;
  duplicate: DuplicateSettings;
}
