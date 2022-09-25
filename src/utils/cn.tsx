import { withNaming } from '@bem-react/classname';

export interface CnProps {
  className?: string;
};

export const cn = withNaming({ e: '__', m: '_', v: '_' });