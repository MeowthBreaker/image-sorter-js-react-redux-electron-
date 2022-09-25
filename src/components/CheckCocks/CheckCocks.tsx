import React, { useCallback } from "react";

import { cn, CnProps } from "../../utils/cn";

import { useSelector, useDispatch } from "react-redux";

import { toggleCompareGIFS } from "../../store/settingsSlice/slice";
import { getSettings } from "../../store/settingsSlice/selectors";

const cls = cn("check-cocks");

export const CheckCocks = () => {
  const settings = useSelector(getSettings);

  const checked = settings.duplicateSettings.compareGIFS;

  const dispatch = useDispatch();

  const onToggle = useCallback(() => {
    dispatch(toggleCompareGIFS());
  }, [dispatch]);

  return <div className={cls()} onClick={onToggle}>
    {
      (checked) ? 'yes' : 'no'
    }
  </div>;
};
