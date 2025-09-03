import { GearType } from '@malib/gear';

export function getGearType(code: number): GearType {
  {
    switch (Math.floor(code / 1000)) {
      case 1098:
        return GearType.soulShield;
      case 1099:
        return GearType.demonShield;
      case 1212:
        return GearType.shiningRod;
      case 1213:
        return GearType.tuner;
      case 1214:
        return GearType.breathShooter;
      case 1215:
        return GearType.longSword2;
      case 1404:
        return GearType.chakram;
    }

    if (Math.floor(code / 10000) == 135) {
      switch (Math.floor(code / 100)) {
        case 13522:
        case 13528:
        case 13529:
        case 13540:
          return Math.floor(code / 10);

        default:
          return Math.floor(code / 100) * 10;
      }
    }

    if (Math.floor(code / 10000) == 119) {
      switch (Math.floor(code / 100)) {
        case 11902:
          return Math.floor(code / 10);
      }
    }

    return Math.floor(code / 10000);
  }
}
