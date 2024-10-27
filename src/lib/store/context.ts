import { BATTERY_ASPECT_RATIO, CANVAS_WIDTH } from './../constants/index';
import { createContext } from 'react';
import type { TGaugeCanvas } from '../../typings';

export const defaultState = {
  canvasWidth: CANVAS_WIDTH,
  canvasHeight: CANVAS_WIDTH * BATTERY_ASPECT_RATIO,
  aspectRatio: BATTERY_ASPECT_RATIO,
  padding: 0,
  value: 10,
  chargingStartValue: 1,
  maxValue: 100,
  clipPathHash: '',
  orientation: 'vertical' as TGaugeCanvas['orientation'],
  animated: true,
  charging: false,
  customization: {
    batteryBody: {
      strokeWidth: 2,
      cornerRadius: 6,
      fill: 'none',
      strokeColor: '#111',
    },
    batteryCap: {
      fill: 'none',
      strokeWidth: 2,
      strokeColor: '#111',
      cornerRadius: 2,
      capToBodyRatio: 0.4,
    },
    batteryMeter: {
      fill: 'green',
      mediumBatteryValue: 50,
      mediumBatteryFill: 'yellow',
      lowBatteryValue: 25,
      lowBatteryFill: 'red',
      outerGap: 1,
      noOfCells: 1,
      interCellsGap: 1,
    },
    chargingFlash: {
      scale: undefined,
      fill: 'orange',
      animated: true,
      animationDuration: 1000,
    },
  },
};

export const Context = createContext<TGaugeCanvas>(defaultState);
