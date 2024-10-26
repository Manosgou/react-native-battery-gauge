import React, {FC} from 'react';
import type {TGaugeCanvas} from '../../typings';
import {Context} from './context';

interface Props {
  children: React.JSX.Element;
  value: TGaugeCanvas & {clipPathHash: string};
}

export const CanvasProvider: FC<Props> = ({children, value}: Props) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
