import {
  GearCapability,
  GearType,
  isAccessory,
  isArmor,
  isShield,
  isWeapon,
} from '@malib/gear';
import { WzGear } from './wz';

export function getCanAddOption(info: WzGear, type: GearType): GearCapability {
  if (info.exUpgradeBlock) {
    return GearCapability.Cannot;
  }
  if (info.exUpgradeChangeBlock) {
    return GearCapability.Fixed;
  }
  return typeSupportsAddOption(type)
    ? GearCapability.Can
    : GearCapability.Cannot;
}

export function typeSupportsAddOption(type: GearType): boolean {
  if (isWeapon(type)) {
    return true;
  }
  if (isArmor(type)) {
    return !isShield(type);
  }
  if (isAccessory(type)) {
    return ![GearType.ring, GearType.shoulder].includes(type);
  }
  if (type === GearType.pocket) {
    return true;
  }
  return false;
}
