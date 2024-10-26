export function getValueInPercentage(value: number, maxValue: number) {
  return Math.round((value / maxValue) * 100);
}

export function checkBatteryFill(
  currentValue: number,
  lowBatteryValue: number,
  mediumBatteryValue: number,
) {
  if (currentValue > lowBatteryValue && currentValue < mediumBatteryValue) {
    return 'MEDIUM';
  } else if (currentValue < lowBatteryValue) {
    return 'LOW';
  }
  return 'NORMAL';
}

export function getVisibleCellsCount(
  value: number,
  maxValue: number,
  noOfCells: number,
) {
  return Math.floor(Math.abs(value / maxValue) * noOfCells);
}
export const timing = (progress: number, easing?: 'linear') => {
  if (easing === 'linear') {
    return progress;
  }
  return progress;
};
