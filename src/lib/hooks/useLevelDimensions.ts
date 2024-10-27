import { BATTERY_CAP, BATTERY_METER, BATTERY_BODY } from './../constants/index';
import { useMemo } from 'react';
import { useBatteryDimensions } from './useBatteryDimensions';
import { useGaugeContext } from './useGaugeContext';

export const useLevelDimensions = () => {
  const { padding, customization } = useGaugeContext();
  const { strokeWidth } = customization[BATTERY_BODY];
  const { capToBodyRatio } = customization[BATTERY_CAP];
  const { outerGap } = customization[BATTERY_METER];
  const { bodyWidth, bodyHeight } = useBatteryDimensions(capToBodyRatio);

  return useMemo(() => {
    const innerBodyWidth = bodyWidth - strokeWidth;
    const innerBodyHeight = bodyHeight - strokeWidth;
    return {
      x: strokeWidth,
      y: strokeWidth,
      width: innerBodyWidth,
      height: innerBodyHeight,
    };
  }, [bodyWidth, bodyHeight, outerGap, padding, strokeWidth]);
};
