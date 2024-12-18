import React, { FC } from 'react';
import {
  BATTERY_BODY,
  BATTERY_CAP,
  BATTERY_METER,
  CANVAS_WIDTH,
  CHARGING_FLASH,
} from './lib/constants';
import { Battery } from './lib/components/Battery';
import { Canvas } from './lib/Canvas';
import { BatteryLevel } from './lib/components/BatteryLevel';
import type {
  DeepPartial,
  FormatValue,
  TGaugeCanvas,
  TGaugeCustom,
} from './typings';
import { defaultState } from './lib/store/context';
import { useClipPathHash } from './lib/hooks/useClipPathHash';
import { useCounterAnimation } from './lib/hooks/useCounterAnimation';
import { G } from 'react-native-svg';

export interface Props
  extends Omit<React.SVGProps<SVGSVGElement>, 'orientation'> {
  /**
   * Meter value range [0-100]
   */
  value: TGaugeCanvas['value'];
  /**
   * Meter max value
   */
  maxValue?: TGaugeCanvas['maxValue'];
  /**
   * Charging starting value
   */
  chargingStartValue?: TGaugeCanvas['chargingStartValue'];
  /**
   * Changes orientation, keeping text horizontal
   */
  orientation?: TGaugeCanvas['orientation'];

  /**
   * We don't like passing both width and height, can create unusual looking shape.
   * Size will help gauge to achieve the desired size maintaining aspect ratio
   */
  size?: number;
  /**
   * Gauge aspect ratio,
   * At padding 0 easy to create battery types ->
   * D = 0.56,
   * C = 0.52,
   * AA = 0.28,
   * AAA = 0.23,
   * AAAA = 0.19 ,
   * default C battery
   */
  aspectRatio?: number;
  /**
   * Padding of gauge within canvas
   */
  padding?: TGaugeCanvas['padding'];
  /**
   * Enable animation on mount
   */
  animated?: boolean;
  /**
   * Battery is charging
   */
  charging?: boolean;
  /**
   * All components customization
   */
  customization?: DeepPartial<TGaugeCustom>;
}

export const BatteryGauge: FC<Props> = ({
  size = 300,
  aspectRatio = defaultState.aspectRatio,
  children,
  padding = defaultState.padding,
  value = defaultState.value,
  chargingStartValue = defaultState.chargingStartValue,
  maxValue = defaultState.maxValue,
  customization = defaultState.customization,
  orientation = defaultState.orientation,
  animated = defaultState.animated,
  charging = defaultState.charging,
  ...restSvgProps
}) => {
  const canvasHeight = Math.round(CANVAS_WIDTH * aspectRatio);
  const height = Math.round(size * aspectRatio);
  const clipPathHash = useClipPathHash();
  const noLowBatteryColor = charging
    ? {
        lowBatteryFill:
          customization[BATTERY_METER]?.fill ||
          defaultState.customization[BATTERY_METER].fill,
      }
    : {};

  const allCustomization: TGaugeCustom = {
    [BATTERY_BODY]: {
      ...defaultState.customization[BATTERY_BODY],
      ...customization[BATTERY_BODY],
    },
    [BATTERY_CAP]: {
      ...defaultState.customization[BATTERY_CAP],
      ...customization[BATTERY_CAP],
    },
    [BATTERY_METER]: {
      ...defaultState.customization[BATTERY_METER],
      ...customization[BATTERY_METER],
      ...noLowBatteryColor,
    },
    [CHARGING_FLASH]: {
      ...defaultState.customization[CHARGING_FLASH],
      ...customization[CHARGING_FLASH],
    },
  };
  const canvasPadding = allCustomization.batteryBody.strokeWidth / 2 + padding;
  const newValue = useCounterAnimation({
    value: value,
    enabled: animated,
  });
  return (
    <Canvas
      width={size}
      height={orientation === 'vertical' ? size : height}
      canvasWidth={CANVAS_WIDTH}
      canvasHeight={canvasHeight}
      padding={canvasPadding}
      value={newValue}
      chargingStartValue={chargingStartValue}
      maxValue={!maxValue ? 1 : maxValue}
      orientation={orientation}
      customization={allCustomization}
      clipPathHash={clipPathHash}
      {...restSvgProps}
    >
      <G
        transform={
          orientation === 'vertical'
            ? `rotate(-90,${CANVAS_WIDTH / 2},${canvasHeight / 2})` // rotate at right top corner
            : ''
        }
      >
        <Battery />
        <BatteryLevel />
        {children}
      </G>
    </Canvas>
  );
};

export default BatteryGauge;
