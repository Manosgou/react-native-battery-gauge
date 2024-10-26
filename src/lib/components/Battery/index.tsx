import React from 'react';
import {BATTERY_BODY, BATTERY_CAP, CLIP_CAP} from '../../constants';
import {useBatteryDimensions} from '../../hooks/useBatteryDimensions';
import {useGaugeContext} from '../../hooks/useGaugeContext';
import {G, Rect, Defs, ClipPath} from 'react-native-svg';
export const Battery = () => {
  const {canvasWidth, canvasHeight, padding, customization, clipPathHash} =
    useGaugeContext();

  const {
    strokeColor: bodyStrokeColor,
    strokeWidth: bodyStrokeWidth,
    fill: bodyFill,
    cornerRadius: bodyCornerRadius,
  } = customization[BATTERY_BODY];

  const {
    strokeColor: capStrokeColor,
    strokeWidth: capStrokeWidth,
    fill: capFill,
    cornerRadius: capCornerRadius,
    capToBodyRatio,
  } = customization[BATTERY_CAP];

  const {bodyWidth, bodyHeight, capWidth, capHeight} =
    useBatteryDimensions(capToBodyRatio);
  return (
    <G>
      <Defs>
        <ClipPath id={CLIP_CAP + clipPathHash}>
          <Rect
            x={canvasWidth - padding - capWidth}
            y={(canvasHeight - capHeight - capStrokeWidth) / 2}
            width={capWidth}
            height={capHeight + capStrokeWidth}
            strokeWidth={capStrokeWidth}
          />
        </ClipPath>
      </Defs>
      <Rect
        x={padding}
        y={padding}
        rx={bodyCornerRadius}
        ry={bodyCornerRadius}
        width={bodyWidth}
        height={bodyHeight}
        strokeWidth={bodyStrokeWidth}
        fill={bodyFill}
        stroke={bodyStrokeColor}
      />
      <Rect
        clipPath={`url(#${CLIP_CAP + clipPathHash})`}
        x={canvasWidth - padding - capWidth - capCornerRadius}
        y={(canvasHeight - capHeight) / 2}
        rx={capCornerRadius}
        ry={capCornerRadius}
        width={capWidth}
        height={capHeight}
        strokeWidth={capStrokeWidth}
        fill={capFill}
        stroke={capStrokeColor}
      />
    </G>
  );
};
