export {
  // core
  Gear,
  type GearIcon,
  GearOption,
  GearPropType,
  type GearReq,
  GearType,
  Potential,
  PotentialGrade,
  type Soul,
  SoulWeapon,
  // logic
  // bonus
  addBonusStat,
  getBonusStatOption,
  getBonusStatValue,
  resetBonusStat,
  type BonusStatGrade,
  BonusStatType,
  // enhancement
  addStarforce,
  addAmazingEnhancement,
  resetEnhancement,
  recalculateStarforce,
  // exceptional
  applyExceptionalEnchant,
  resetExceptionalEnchant,
  type ExceptionalParts,
  // scroll
  type Scroll,
  type SpellTraceProbability,
  type SpellTraceStatType,
  getSpellTraceScroll,
  // upgrade
  applyGoldHammer,
  applyScroll,
  applySpellTrace,
  addUpgradeFailCount,
  restoreUpgradeCount,
  resetUpgrade,
  // create
  type IGearRepository,
  GearRepository,
  createGearFromNode,
  type IPotentialRepository,
  PotentialRepository,
  createPotentialFromNode,
  type ISoulRepository,
  SoulRepository,
  createSoulFromNode,
  MagnificentSoulOptionType,
  // interface
  type GearDataMap,
  type GearData,
  type ItemOptionMap,
  type ItemOption,
  type SoulDataMap,
  type SoulData,
  type SoulOption,
  type MagnificentSoulOption,
  // migrate
  migrate,
  // serialize
  plainToGear,
  gearToPlain,
  stringifyGear,
  parseGear,
  validateParseGear,
  isGearLike,
  type GearLike,
  type OptionLike as GearOptionLike,
  type PotLike as GearPotLike,
  type SoulWeaponLike,
} from "./internal";
