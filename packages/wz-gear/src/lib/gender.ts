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
  const value = Math.floor(info.id / 1000) % 10;
  switch (value) {
    case GearGender.Male:
      return GearGender.Male;
    case GearGender.Female:
      return GearGender.Female;
    default:
      return undefined;
  }
}
