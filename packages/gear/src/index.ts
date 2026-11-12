export {
  AddOptionType,
  GearCapability,
  GearCuttable,
  GearGender,
  GearShare,
  GearTrade,
  GearType,
  PotentialGrade,
  type AddOptionData,
  type AddOptionGrade,
  type GearAddOption,
  type GearAttributeData,
  type GearBaseOption,
  type GearData,
  type GearExceptionalOption,
  type GearGrowthData,
  type GearGrowthLevelData,
  type GearGrowthOption,
  type GearIncline,
  type GearOption,
  type GearReqData,
  type GearReqJobData,
  type GearShapeData,
  type GearStarforceOption,
  type GearUpgradeOption,
  type PotentialData,
  type PotentialOption,
  type ReadonlyGearGrowthData,
  type ReadonlyGearGrowthLevelData,
  type ReadonlySoulData,
  type SoulBaseOption,
  type SoulData,
  type SoulOption,
  type SoulWeaponData,
} from './lib/data';
export {
  applyAddOption,
  canApplyAddOption,
  canResetAddOption,
  getAddOption,
  getAddOptionValue,
  resetAddOption,
  supportsAddOption,
} from './lib/enhance/addOption';
export {
  applyExceptional,
  canApplyExceptional,
  canResetExceptional,
  resetExceptional,
  supportsExceptional,
  type ExceptionalHammer,
} from './lib/enhance/exceptional';
export {
  applyGrowth,
  canApplyGrowth,
  canResetGrowth,
  getGrowthLevelData,
  resetGrowth,
  supportsGrowth,
} from './lib/enhance/growth';
export {
  canSetAdditionalPotential,
  canSetPotential,
  resetAdditionalPotential,
  resetPotential,
  setAdditionalPotential,
  setPotential,
  supportsAdditionalPotential,
  supportsPotential,
  type ReadonlyPotential,
} from './lib/enhance/potential';
export {
  applySoulAmplification,
  applySoulEnchant,
  canApplySoulAmplification,
  canApplySoulEnchant,
  canSetSoul,
  canSetSoulPotential,
  getSoulBaseOption,
  removeSoul,
  removeSoulEnchant,
  resetSoulWeapon,
  setSoul,
  setSoulPotential,
  supportsSoulAmplification,
  supportsSoulWeapon,
} from './lib/enhance/soulWeapon';
export {
  applySpellTrace,
  getSpellTraceScroll,
  SpellTraceType,
  type SpellTrace,
  type SpellTraceRate,
} from './lib/enhance/spellTrace';
export {
  canResetStarforce,
  canStarforce,
  canStarScroll,
  getHardMaxStar,
  getMaxStar,
  resetStarforce,
  starforce,
  starScroll,
  supportsStarforce,
} from './lib/enhance/starforce';
export {
  applyScroll,
  canApplyScroll,
  canFailScroll,
  canResetUpgrade,
  canResileScroll,
  failScroll,
  resetUpgrade,
  resileScroll,
  supportsUpgrade,
  type Scroll,
} from './lib/enhance/upgrade';
export { GearError, type ErrorLanguage } from './lib/error';
export { Gear } from './lib/Gear';
export { GearAttribute } from './lib/GearAttribute';
export { toGearOption } from './lib/gearOption';
export { GearReq, GearReqJob } from './lib/GearReq';
export {
  isAccessory,
  isArmor,
  isDoubleHandWeapon,
  isDragonGear,
  isLeftWeapon,
  isMechanicGear,
  isShield,
  isSubWeapon,
  isWeapon,
} from './lib/gearType';
export { migrate } from './lib/manage/migrate';
export { ReadonlyGear, type GearConfig } from './lib/ReadonlyGear';
