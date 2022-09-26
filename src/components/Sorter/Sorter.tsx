import React from 'react';
import { cn } from '../../utils/cn';

const cls = cn('sorter');

export const Sorter = () => {

  return (
    <div className={cls()}>
      <div className={cls('bar')}>
        <div className={cls('bar-buttons')}></div>
        <div className={cls('info-button')}></div>
      </div>
    </div>
  );
};