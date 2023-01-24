export function randomInt(maxValue: number): number;
export function randomInt(minValue: number, maxValue: number): number;
export function randomInt(firstValue: number, secondValue?: number): number {
  if (secondValue === undefined) {
    return Math.floor(Math.random() * firstValue);
  } else {
    return Math.floor(Math.random() * (secondValue - firstValue) + firstValue);
  }
}

export function randomKey(weights: { [key: string]: number }): string;
export function randomKey(
  weights: { [key: string]: number },
  except: (string | number)[]
): string;
export function randomKey(
  weights: { [key: string]: number },
  except?: (string | number)[]
): string {
  if (except) {
    weights = { ...weights };
    for (const exceptKey of except) {
      delete weights[exceptKey];
    }
  }
  if (Object.keys(weights).length === 0) {
    return "";
  }

  const weightSum = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = randomInt(weightSum);
  for (const [key, weight] of Object.entries(weights)) {
    random -= weight;
    if (random < 0) {
      return key;
    }
  }
  throw Error("Unreachable code");
}
