import { GearType } from './data';
import {
  isAccessory,
  isArmor,
  isDoubleHandWeapon,
  isDragonGear,
  isLeftWeapon,
  isMechanicGear,
  isSubWeapon,
  isWeapon,
} from './gearType';
import { getGearTypeContains } from './testUtils';

describe.each([
  { predicate: isWeapon, types: getWeaponTypes() },
  { predicate: isLeftWeapon, types: getLeftWeaponTypes() },
  { predicate: isDoubleHandWeapon, types: getDoubleHandWeaponTypes() },
  { predicate: isSubWeapon, types: getSubWeaponTypes() },
  { predicate: isArmor, types: getArmorTypes() },
  { predicate: isAccessory, types: getAccessoryTypes() },
  { predicate: isMechanicGear, types: getMechanicGearTypes() },
  { predicate: isDragonGear, types: getDragonGearTypes() },
])('$predicate.name return value', ({ predicate, types }) => {
  it.each(getGearTypeContains(types))(
    '%d should yield %p',
    (type, expected) => {
      const actual = predicate(type);

      expect(actual).toBe(expected);
    },
  );
});

function getWeaponTypes() {
  return [
    GearType.shiningRod,
    GearType.tuner,
    GearType.breathShooter,
    GearType.soulShooter,
    GearType.desperado,
    GearType.energySword,
    GearType.espLimiter,
    GearType.chain,
    GearType.magicGauntlet,
    GearType.ritualFan,
    GearType.ohSword,
    GearType.ohAxe,
    GearType.ohBlunt,
    GearType.dagger,
    GearType.cane,
    GearType.wand,
    GearType.staff,
    GearType.thSword,
    GearType.chakram,
    GearType.thAxe,
    GearType.thBlunt,
    GearType.spear,
    GearType.polearm,
    GearType.bow,
    GearType.crossbow,
    GearType.claw,
    GearType.knuckle,
    GearType.gun,
    GearType.dualBowguns,
    GearType.handCannon,
    GearType.heavySword,
    GearType.longSword,
    GearType.gauntletRevolver,
    GearType.ancientBow,
  ];
}

function getLeftWeaponTypes() {
  return [
    GearType.shiningRod,
    GearType.tuner,
    GearType.breathShooter,
    GearType.soulShooter,
    GearType.desperado,
    GearType.energySword,
    GearType.espLimiter,
    GearType.chain,
    GearType.magicGauntlet,
    GearType.ritualFan,
    GearType.ohSword,
    GearType.ohAxe,
    GearType.ohBlunt,
    GearType.dagger,
    GearType.cane,
    GearType.wand,
    GearType.staff,
  ];
}

function getDoubleHandWeaponTypes() {
  return [
    GearType.thSword,
    GearType.chakram,
    GearType.thAxe,
    GearType.thBlunt,
    GearType.spear,
    GearType.polearm,
    GearType.bow,
    GearType.crossbow,
    GearType.claw,
    GearType.knuckle,
    GearType.gun,
    GearType.dualBowguns,
    GearType.handCannon,
    GearType.heavySword,
    GearType.longSword,
    GearType.gauntletRevolver,
    GearType.ancientBow,
  ];
}

function getSubWeaponTypes() {
  return [
    GearType.shield,
    GearType.katara,
    GearType.soulShield,
    GearType.demonShield,
    GearType.magicArrow,
    GearType.card,
    GearType.medallion,
    GearType.rosary,
    GearType.ironChain,
    GearType.magicBook1,
    GearType.magicBook2,
    GearType.magicBook3,
    GearType.arrowFletching,
    GearType.bowThimble,
    GearType.daggerScabbard,
    GearType.charm,
    GearType.orb,
    GearType.dragonEssence,
    GearType.soulRing,
    GearType.magnum,
    GearType.wristBand,
    GearType.farSight,
    GearType.powderKeg,
    GearType.mass,
    GearType.document,
    GearType.magicMarble,
    GearType.arrowhead,
    GearType.jewel,
    GearType.powderKeg2,
    GearType.controller,
    GearType.foxMarble,
    GearType.chessPiece,
    GearType.transmitter,
    GearType.charge,
    GearType.magicWing,
    GearType.pathOfAbyss,
    GearType.relic,
    GearType.fanTassel,
    GearType.bracelet,
    GearType.weaponBelt,
    GearType.ornament,
    GearType.hexSeeker,
  ];
}

function getArmorTypes() {
  return [
    GearType.cap,
    GearType.coat,
    GearType.longcoat,
    GearType.pants,
    GearType.shoes,
    GearType.glove,
    GearType.cape,
    GearType.shield,
    GearType.soulShield,
    GearType.demonShield,
  ];
}

function getAccessoryTypes() {
  return [
    GearType.faceAccessory,
    GearType.eyeAccessory,
    GearType.earrings,
    GearType.ring,
    GearType.pendant,
    GearType.belt,
    GearType.shoulder,
  ];
}

function getMechanicGearTypes() {
  return [
    GearType.machineEngine,
    GearType.machineArms,
    GearType.machineLegs,
    GearType.machineBody,
    GearType.machineTransistors,
  ];
}

function getDragonGearTypes() {
  return [
    GearType.dragonMask,
    GearType.dragonPendant,
    GearType.dragonWings,
    GearType.dragonTail,
  ];
}
