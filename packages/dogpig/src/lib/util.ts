export function randomInt(maxValue: number): number;
export function randomInt(minValue: number, maxValue: number): number;
export function randomInt(firstValue: number, secondValue?: number): number {
  if (secondValue === undefined) {
    return Math.floor(Math.random() * firstValue);
  } else {
    return Math.floor(Math.random() * (secondValue - firstValue) + firstValue);
  }
}

export function randomIndex(weights: number[]): number {
  return randomIndexCumulative(cumulativeSum(weights));
}

export function cumulativeSum(values: number[]): number[] {
  let sum: number;
  return values.map(((sum = 0), (value) => (sum += value)));
}

export function randomIndexCumulative(weights: number[]): number {
  const weightSum = weights[weights.length - 1];
  const random = randomInt(weightSum);
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      return i;
    }
  }
  throw Error();
}
