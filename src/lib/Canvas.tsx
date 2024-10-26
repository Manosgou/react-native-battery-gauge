import React from 'react';
import {TGaugeCanvas} from '../typings';
import {CanvasProvider} from './store/Provider';
import {Svg} from 'react-native-svg';

export interface TCanvasProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'orientation'>,
    TGaugeCanvas {}

export const Canvas = (props: TCanvasProps) => {
  const {
    children,
    canvasWidth,
    canvasHeight,
    padding,
    value,
    chargingStartValue,
    maxValue,
    orientation,
    customization,
    clipPathHash,
    ...otherSvgProps
  } = props;
  return (
    <CanvasProvider
      value={{
        canvasWidth,
        canvasHeight,
        padding,
        value,
        chargingStartValue,
        maxValue,
        orientation,
        customization,
        clipPathHash,
      }}>
      <Svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>{children}</Svg>
    </CanvasProvider>
  );
};
