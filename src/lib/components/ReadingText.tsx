import React from 'react';
import {
  BATTERY_METER,
  CLIP_METER,
  CLIP_METER_EMPTY,
  CLIP_METER_FILLED,
  READING_TEXT,
} from '../constants';
import {useGaugeContext} from '../hooks/useGaugeContext';
import {useLevelDimensions} from '../hooks/useLevelDimensions';
import {
  checkLowBattery,
  getValueInPercentage,
  getVisibleCellsCount,
} from '../utils';
import type {FormatValue} from '../../typings';
import Text, {G, Rect, Defs, ClipPath} from 'react-native-svg';

type ReadingTextProps = {
  formatValue: FormatValue;
};
export const ReadingText = (props: ReadingTextProps) => {
  const {formatValue} = props;
  const {value, maxValue, orientation, customization, clipPathHash} =
    useGaugeContext();
  const {x, y, width, height} = useLevelDimensions();
  const {
    fontFamily,
    darkContrastColor,
    lightContrastColor,
    lowBatteryColor,
    showPercentage,
    fontSize,
    ...otherTextProps
  } = customization[READING_TEXT];
  const {lowBatteryValue, noOfCells, interCellsGap} =
    customization[BATTERY_METER];
  const percentageSign = showPercentage ? '%' : '';
  const valueRatio = value / maxValue;
  const isCellTypeBattery = noOfCells > 1;
  const noOfVisibleCells = getVisibleCellsCount(value, maxValue, noOfCells);
  const noOfInvisibleCells = noOfCells - noOfVisibleCells;
  const widthPerCell = width / noOfCells;
  const readingValue = getValueInPercentage(value, maxValue);

  const renderTextElement = (contrastColor: string, clipPathId: string) => {
    return (
      <Text> {readingValue}</Text>
      // <Text
      //   className={READING_TEXT}
      //   x={x + width / 2}
      //   y={y + height / 2}
      //   dominantBaseline="middle"
      //   clipPath={`url(#${clipPathId})`}
      //   fill={
      //     checkLowBattery(value, lowBatteryValue)
      //       ? lowBatteryColor
      //       : contrastColor
      //   }
      //   fontFamily={fontFamily}
      //   fontWeight="bold"
      //   fontSize={fontSize}
      //   writingMode={orientation === 'vertical' ? 'tb' : 'lr'}
      //   {...otherTextProps}>

      // </Text>
    );
  };
  const areaFilledWidth = Math.max(
    isCellTypeBattery
      ? widthPerCell * noOfVisibleCells - interCellsGap / 2
      : width * valueRatio,
    0,
  );

  return (
    <G>
      <Defs>
        <ClipPath id={CLIP_METER_FILLED + clipPathHash}>
          <Rect
            x={x}
            y={y}
            width={areaFilledWidth}
            height={height}
            clipPath={`url(#${CLIP_METER + clipPathHash})`}
          />
        </ClipPath>
        <ClipPath id={CLIP_METER_EMPTY + clipPathHash}>
          <Rect
            x={x + areaFilledWidth}
            y={y}
            width={
              isCellTypeBattery
                ? widthPerCell * noOfInvisibleCells
                : width * (1 - valueRatio)
            }
            height={height}
            clipPath={`url(#${CLIP_METER + clipPathHash})`}
          />
        </ClipPath>
      </Defs>
      {renderTextElement(darkContrastColor, CLIP_METER_FILLED + clipPathHash)}
      {renderTextElement(lightContrastColor, CLIP_METER_EMPTY + clipPathHash)}
    </G>
  );
};
