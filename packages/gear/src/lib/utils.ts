import { GearOption } from './data';

export function sumOptions(
  ...options: Partial<GearOption>[]
): Partial<GearOption> {
  const sum: Record<string, number> = {};
  for (const option of options) {
    for (const [stat, value] of Object.entries(option)) {
      if (stat in sum) {
        sum[stat] += value;
      } else {
        sum[stat] = value;
      }
    }
  }
  return sum;
}
