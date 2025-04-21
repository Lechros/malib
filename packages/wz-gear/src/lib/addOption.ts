import {
  AddOptionCan,
  GearType,
  isAccessory,
  isArmor,
  isShield,
  isWeapon,
} from '@malib/gear';
import { WzGear } from './wz';

export function getCanAddOption(info: WzGear, type: GearType): AddOptionCan {
  if (info.exUpgradeBlock) {
    return AddOptionCan.Cannot;
  }
  if (info.exUpgradeChangeBlock) {
    return AddOptionCan.Fixed;
  }
  return typeSupportsAddOption(type) ? AddOptionCan.Can : AddOptionCan.Cannot;
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
