import { GearType } from './data';
import {
  isWeapon,
  isLeftWeapon,
  isDoubleHandWeapon,
  isSubWeapon,
  isArmor,
  isAccessory,
  isMechanicGear,
  isDragonGear,
} from './gearType';

function assertNever(_: never) {}

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
  it.each(getGearTypeMap(types))('%d should yield %p', (type, expected) => {
    const actual = predicate(type);

    expect(actual).toBe(expected);
  });
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

function getGearTypeMap(types: GearType[]): [GearType, boolean][] {
  const set = new Set(types);
  return getGearTypes().map((type) => [type, set.has(type)]);
}

function getGearTypes() {
  return [
    GearType.cap,
    GearType.faceAccessory,
    GearType.eyeAccessory,
    GearType.earrings,
    GearType.coat,
    GearType.longcoat,
    GearType.pants,
    GearType.shoes,
    GearType.glove,
    GearType.cape,
    GearType.ring,
    GearType.pendant,
    GearType.belt,
    GearType.medal,
    GearType.shoulder,
    GearType.pocket,
    GearType.badge,
    GearType.android,
    GearType.machineHeart,
    GearType.shield,
    GearType.emblem,
    GearType.powerSource,
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
    GearType.katara,
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
    GearType.shovel,
    GearType.pickaxe,
    GearType.dualBowguns,
    GearType.handCannon,
    GearType.heavySword,
    GearType.longSword,
    GearType.gauntletRevolver,
    GearType.ancientBow,
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
    GearType.petEquip,
    GearType.machineEngine,
    GearType.machineArms,
    GearType.machineLegs,
    GearType.machineBody,
    GearType.machineTransistors,
    GearType.dragonMask,
    GearType.dragonPendant,
    GearType.dragonWings,
    GearType.dragonTail,
  ];
}

test('switch all gear types', () => {
  (type: GearType) => {
    switch (type) {
      case GearType.cap:
        return;
      case GearType.faceAccessory:
        return;
      case GearType.eyeAccessory:
        return;
      case GearType.earrings:
        return;
      case GearType.coat:
        return;
      case GearType.longcoat:
        return;
      case GearType.pants:
        return;
      case GearType.shoes:
        return;
      case GearType.glove:
        return;
      case GearType.cape:
        return;
      case GearType.ring:
        return;
      case GearType.pendant:
        return;
      case GearType.belt:
        return;
      case GearType.medal:
        return;
      case GearType.shoulder:
        return;
      case GearType.pocket:
        return;
      case GearType.badge:
        return;
      case GearType.android:
        return;
      case GearType.machineHeart:
        return;
      case GearType.shield:
        return;
      case GearType.emblem:
        return;
      case GearType.powerSource:
        return;
      case GearType.shiningRod:
        return;
      case GearType.tuner:
        return;
      case GearType.breathShooter:
        return;
      case GearType.soulShooter:
        return;
      case GearType.desperado:
        return;
      case GearType.energySword:
        return;
      case GearType.espLimiter:
        return;
      case GearType.chain:
        return;
      case GearType.magicGauntlet:
        return;
      case GearType.ritualFan:
        return;
      case GearType.ohSword:
        return;
      case GearType.ohAxe:
        return;
      case GearType.ohBlunt:
        return;
      case GearType.dagger:
        return;
      case GearType.katara:
        return;
      case GearType.cane:
        return;
      case GearType.wand:
        return;
      case GearType.staff:
        return;
      case GearType.thSword:
        return;
      case GearType.chakram:
        return;
      case GearType.thAxe:
        return;
      case GearType.thBlunt:
        return;
      case GearType.spear:
        return;
      case GearType.polearm:
        return;
      case GearType.bow:
        return;
      case GearType.crossbow:
        return;
      case GearType.claw:
        return;
      case GearType.knuckle:
        return;
      case GearType.gun:
        return;
      case GearType.shovel:
        return;
      case GearType.pickaxe:
        return;
      case GearType.dualBowguns:
        return;
      case GearType.handCannon:
        return;
      case GearType.heavySword:
        return;
      case GearType.longSword:
        return;
      case GearType.gauntletRevolver:
        return;
      case GearType.ancientBow:
        return;
      case GearType.soulShield:
        return;
      case GearType.demonShield:
        return;
      case GearType.magicArrow:
        return;
      case GearType.card:
        return;
      case GearType.medallion:
        return;
      case GearType.rosary:
        return;
      case GearType.ironChain:
        return;
      case GearType.magicBook1:
        return;
      case GearType.magicBook2:
        return;
      case GearType.magicBook3:
        return;
      case GearType.arrowFletching:
        return;
      case GearType.bowThimble:
        return;
      case GearType.daggerScabbard:
        return;
      case GearType.charm:
        return;
      case GearType.orb:
        return;
      case GearType.dragonEssence:
        return;
      case GearType.soulRing:
        return;
      case GearType.magnum:
        return;
      case GearType.wristBand:
        return;
      case GearType.farSight:
        return;
      case GearType.powderKeg:
        return;
      case GearType.mass:
        return;
      case GearType.document:
        return;
      case GearType.magicMarble:
        return;
      case GearType.arrowhead:
        return;
      case GearType.jewel:
        return;
      case GearType.powderKeg2:
        return;
      case GearType.controller:
        return;
      case GearType.foxMarble:
        return;
      case GearType.chessPiece:
        return;
      case GearType.transmitter:
        return;
      case GearType.charge:
        return;
      case GearType.magicWing:
        return;
      case GearType.pathOfAbyss:
        return;
      case GearType.relic:
        return;
      case GearType.fanTassel:
        return;
      case GearType.bracelet:
        return;
      case GearType.weaponBelt:
        return;
      case GearType.ornament:
        return;
      case GearType.hexSeeker:
        return;
      case GearType.petEquip:
        return;
      case GearType.machineEngine:
        return;
      case GearType.machineArms:
        return;
      case GearType.machineLegs:
        return;
      case GearType.machineBody:
        return;
      case GearType.machineTransistors:
        return;
      case GearType.dragonMask:
        return;
      case GearType.dragonPendant:
        return;
      case GearType.dragonWings:
        return;
      case GearType.dragonTail:
        return;
    }
    assertNever(type);
  };
});
