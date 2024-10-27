import { useEffect, useMemo, useState } from 'react';
import {
  BATTERY_BODY,
  BATTERY_METER,
  CLIP_METER,
  CLIP_METER_FILLED,
} from '../constants';
import { useGaugeContext } from '../hooks/useGaugeContext';
import { useLevelDimensions } from '../hooks/useLevelDimensions';
import { checkBatteryFill, getVisibleCellsCount } from '../utils';
import { G, Rect, Defs, ClipPath } from 'react-native-svg';
import { ColorValue } from 'react-native';

export const BatteryLevel = () => {
  const [colorFill, setColorFill] = useState<ColorValue>();
  const { value, maxValue, customization, clipPathHash } = useGaugeContext();
  const { x, y, width, height } = useLevelDimensions();
  const {
    fill,
    lowBatteryFill,
    mediumBatteryFill,
    gradFill,
    lowBatteryValue,
    mediumBatteryValue,
    outerGap,
    noOfCells,
    interCellsGap,
  } = customization[BATTERY_METER];
  const { strokeWidth: bodyStrokeWidth, cornerRadius: bodyCornerRadius } =
    customization[BATTERY_BODY];

  const cellList = useMemo(() => {
    const noOfVisibleCells = getVisibleCellsCount(value, maxValue, noOfCells);
    if (noOfVisibleCells === 0 && value > 0) {
      return ['cell'];
    }
    return new Array(noOfVisibleCells).fill('cell');
  }, [value, maxValue, noOfCells]);

  useEffect(() => {
    switch (checkBatteryFill(value, lowBatteryValue, mediumBatteryValue)) {
      case 'MEDIUM':
        setColorFill(mediumBatteryFill);
        break;
      case 'LOW':
        setColorFill(lowBatteryFill);
        break;
      case 'NORMAL':
        setColorFill(fill);
        break;
    }
  }, [value]);
  return (
    <G>
      <Defs>
        <ClipPath id={CLIP_METER + clipPathHash}>
          <Rect
            x={x}
            y={y}
            rx={bodyCornerRadius - bodyStrokeWidth / 2 - outerGap}
            ry={bodyCornerRadius - bodyStrokeWidth / 2 - outerGap}
            width={width}
            height={height}
          />
        </ClipPath>
        {noOfCells < 2 && gradFill && (
          <linearGradient id={'levelGradient' + clipPathHash}>
            {gradFill.map((item) => {
              return (
                <stop
                  key={item.color}
                  offset={item.offset + '%'}
                  stopColor={item.color}
                />
              );
            })}
          </linearGradient>
        )}
      </Defs>
      {noOfCells === 1 && (
        <G>
          {gradFill ? (
            <Rect
              clipPath={`url(#${CLIP_METER_FILLED + clipPathHash})`}
              x={x}
              y={y}
              width={width}
              height={height}
              fill={`url(#levelGradient${clipPathHash})`}
            />
          ) : (
            <Rect
              clipPath={`url(#${CLIP_METER + clipPathHash})`}
              x={x}
              y={y}
              width={(width * value) / maxValue}
              height={height}
              fill={colorFill}
            />
          )}
        </G>
      )}
      <G>
        {noOfCells > 1 &&
          cellList.map((_item, index) => {
            return (
              <Rect
                key={index}
                clipPath={`url(#${CLIP_METER + clipPathHash})`}
                x={x + ((width + interCellsGap) / noOfCells) * index}
                y={y}
                width={width / noOfCells - interCellsGap}
                height={height}
                fill={colorFill}
              />
            );
          })}
      </G>
    </G>
  );
};
