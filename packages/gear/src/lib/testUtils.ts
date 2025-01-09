import { GearData, GearType } from './data';
import { Gear } from './Gear';

export function defaultGear(data: Partial<GearData>): Gear {
  return new Gear({
    meta: {
      id: 1234567,
      version: 1,
      add: [],
    },
    name: '',
    type: GearType.cap,
    req: {},
    attributes: {},

    ...data,
  });
}

export function getAllGearTypes() {
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

export function getGearTypeContains(types: GearType[]): [GearType, boolean][] {
  const set = new Set(types);
  return getAllGearTypes().map((type) => [type, set.has(type)]);
}
