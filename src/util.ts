import GearPropType from "./GearPropType";

function asGearPropType(key: string): GearPropType {
  if(key in GearPropType) {
    return GearPropType[key as keyof typeof GearPropType];
  }
}

type Enum = {
  [id: string]: number;
  // [nu: number]: string;
};

export function asEnum<T extends Enum>(key: string, type: T): number {
  if(!(key in type)) {
    throw Error(`${key} key does not exist in ${type}!`);
  }
  return type[key as keyof typeof type];
}r

export function addGearPropValue(
  dest: Map<GearPropType, number>,
  type: GearPropType,
  value: number,
  option: "add" | "sub" = "add"
) {
  let newValue: number;
  const destValue = dest.get(type) ?? 0;
  const otherValue = option === "sub" ? -value : value;

  if(type === GearPropType.imdR || type === GearPropType.incIMDR || type === GearPropType.ignoreTargetDEF) {
    if(otherValue > 0) {
      newValue = 100 - (1 - destValue / 100) * (1 - otherValue / 100) * 100;
    }
    else {
      newValue = 100 - (1 - destValue / 100) / (1 - otherValue / 100) * 100;
    }
  }
  else {
    newValue = destValue + otherValue;
  }
  dest.set(type, newValue);
}

/**
 * in-place
 * @param dest
 * @param other
 * @param option
 * @returns
 */
export function addGearProp(
  dest: Map<GearPropType, number>,
  other: Map<GearPropType, number>,
  option: "add" | "sub" = "add"
): Map<GearPropType, number> {
  for(const [type, value] of other) {
    addGearPropValue(dest, type, value, option);
  }
  return dest;
}
