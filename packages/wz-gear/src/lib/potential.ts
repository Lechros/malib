import {
  GearType,
  isDragonGear,
  isMechanicGear,
  isSubWeapon,
  PotentialCan,
} from '@malib/gear';
import { WzGear } from './wz';

export function getCanPotential(info: WzGear, type: GearType): PotentialCan {
  if (info.noPotential) {
    return PotentialCan.Cannot;
  } else if (info.fixedPotential) {
    return PotentialCan.Fixed;
  }
  if ((info.tuc && info.tuc > 0) || info.tucIgnoreForPotential) {
    if (isMechanicGear(type) || isDragonGear(type)) {
      return PotentialCan.Cannot;
    } else {
      return PotentialCan.Can;
    }
  }
  return typeSupportsPotential(type) ? PotentialCan.Can : PotentialCan.Cannot;
}

export function getCanAdditionalPotential(
  info: WzGear,
  type: GearType,
): PotentialCan {
  if (info.noPotential) {
    return PotentialCan.Cannot;
  } else if (info.fixedPotential) {
    return PotentialCan.Cannot;
  }
  if ((info.tuc && info.tuc > 0) || info.tucIgnoreForPotential) {
    if (isMechanicGear(type) || isDragonGear(type)) {
      return PotentialCan.Cannot;
    } else {
      return PotentialCan.Can;
    }
  }
  return typeSupportsPotential(type) ? PotentialCan.Can : PotentialCan.Cannot;
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
