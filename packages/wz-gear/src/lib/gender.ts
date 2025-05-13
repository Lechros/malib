import { GearGender, GearType } from '@malib/gear';
import { WzGear } from './wz';

export function getGender(
  info: WzGear,
  type: GearType,
): GearGender | undefined {
  switch (type) {
    case GearType.emblem:
    case GearType.powerSource:
    case GearType.jewel:
      return undefined;
  }
  return Math.floor(info.id / 1000) % 10;
}
