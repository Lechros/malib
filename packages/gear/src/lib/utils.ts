import { GearOption } from './data';

export function addOptions(
  option: Partial<GearOption>,
  ...options: Partial<GearOption>[]
): void {
  const sum: Record<string, number> = option;
  for (const option of options) {
    for (const [stat, value] of Object.entries<number>(option)) {
      if (stat in sum) {
        sum[stat] += value;
      } else {
        sum[stat] = value;
      }
    }
  }
}

export function sumOptions(
  ...options: Partial<GearOption>[]
): Partial<GearOption> {
  const sum: Record<string, number> = {};
  addOptions(sum, ...options);
  return sum;
}
