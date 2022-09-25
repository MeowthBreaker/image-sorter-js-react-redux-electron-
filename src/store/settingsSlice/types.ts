export interface SorterSettings {
  searchMethod: "on top" | "deep";
  skipAction: "delete" | "folder";
}

type AllowedImageTypes = "jpg" | "png";

export interface DuplicateSettings {
  compareGIFS: boolean;
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

export interface HotKeySettings {
  sorter: SorterHotkeys;
  duplicate: DuplicateHotKeys;
}

export interface SettingsState {
  sorterSettings: SorterSettings;
  duplicateSettings: DuplicateSettings;
  hotkeysSettings: HotKeySettings;
}