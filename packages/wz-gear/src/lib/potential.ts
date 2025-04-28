import {
  GearType,
  isDragonGear,
  isMechanicGear,
  isSubWeapon,
  GearCapability,
} from '@malib/gear';
import { WzGear } from './wz';

export function getCanPotential(info: WzGear, type: GearType): GearCapability {
  if (info.noPotential) {
    return GearCapability.Cannot;
  } else if (info.fixedPotential) {
    return GearCapability.Fixed;
  }
  if ((info.tuc && info.tuc > 0) || info.tucIgnoreForPotential) {
    if (isMechanicGear(type) || isDragonGear(type)) {
      return GearCapability.Cannot;
    } else {
      return GearCapability.Can;
    }
  }
  return typeSupportsPotential(type)
    ? GearCapability.Can
    : GearCapability.Cannot;
}

export function getCanAdditionalPotential(
  info: WzGear,
  type: GearType,
): GearCapability {
  if (info.noPotential) {
    return GearCapability.Cannot;
  } else if (info.fixedPotential) {
    return GearCapability.Cannot;
  }
  if ((info.tuc && info.tuc > 0) || info.tucIgnoreForPotential) {
    if (isMechanicGear(type) || isDragonGear(type)) {
      return GearCapability.Cannot;
    } else {
      return GearCapability.Can;
    }
  }
  return typeSupportsPotential(type)
    ? GearCapability.Can
    : GearCapability.Cannot;
}

export function typeSupportsPotential(type: GearType) {
  if (isSubWeapon(type)) {
    return true;
  }
  switch (type) {
    case GearType.soulShield:
    case GearType.demonShield:
    case GearType.katara:
    case GearType.magicArrow:
    case GearType.card:
    case GearType.orb:
    case GearType.dragonEssence:
    case GearType.soulRing:
    case GearType.magnum:
    case GearType.emblem:
      return true;
    default:
      return false;
  }
}
