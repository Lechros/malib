import { GearPropType } from "./GearPropType";

type Enum = {
  [key: string]: number | string;
};

export function asEnum<T extends Enum>(key: string, type: T): number {
  if (!(key in type)) {
    throw Error(`${key} key does not exist in ${type}!`);
  }
  return type[key] as number;
}

export function addGearProp(
  destination: Map<GearPropType, number>,
  source: Map<GearPropType, number>
): Map<GearPropType, number> {
  for (const [type, value] of source) {
    if (value === 0) {
      continue;
    }
    let newValue = destination.get(type) ?? 0;
    if (newValue === 0) {
      destination.set(type, value);
    } else {
      switch (type) {
        case GearPropType.imdR:
        case GearPropType.incIMDR:
        case GearPropType.ignoreTargetDEF:
          newValue = 100 - (1 - newValue * 0.01) * (1 - value * 0.01) * 100;
          destination.set(type, newValue);
          break;
        default:
          newValue += value;
          destination.set(type, newValue);
          break;
      }
    }
  }
  return destination;
}
