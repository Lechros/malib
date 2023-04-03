import { Gear, GearOption, Potential, SoulWeapon } from "@malib/gear";
import { GearLike, OptionLike, PotLike, SoulWeaponLike } from "./interface";

export function deserializeGear(like: GearLike): Gear {
  const gear = new Gear();
  gear.itemID = like.id;
  gear.name = like.name;
  if (like.desc) gear.desc = like.desc;
  gear.icon = like.icon;
  if (like.anvilIcon && like.anvilName) {
    gear.anvilIcon = like.anvilIcon;
    gear.anvilName = like.anvilName;
  }
  gear.type = like.type;
  gear.req = like.req;
  gear.props = deserializeMap(like.props);
  gear.options = deserializeMap(like.options, deserializeOption);
  if (like.tuc) gear.totalUpgradeCount = like.tuc;
  if (like.up) gear.upgradeCount = like.up;
  if (like.fail) gear.upgradeFailCount = like.fail;
  if (like.hammer) gear.hammerCount = like.hammer;
  if (like.maxStar) gear.maxStar = like.maxStar;
  if (like.star) gear.star = like.star;
  if (like.amazing) gear.amazing = like.amazing;
  if (like.karma) gear.karma = like.karma;
  if (like.canPot) gear.canPotential = like.canPot;
  if (like.grade) gear.grade = like.grade;
  if (like.pots)
    gear.potentials = deserializeArray(like.pots, deserializePotential);
  if (like.addGrade) gear.additionalGrade = like.addGrade;
  if (like.addPots)
    gear.additionalPotentials = deserializeArray(
      like.addPots,
      deserializePotential
    );
  gear.soulWeapon = deserializeSoulWeapon(like.soulWeapon, gear);
  return gear;
}

function deserializeOption(like: OptionLike): GearOption {
  const option = new GearOption();
  if (like.base) option.base = like.base;
  if (like.bonus) option.bonus = like.bonus;
  if (like.upgrade) option.upgrade = like.upgrade;
  if (like.enchant) option.enchant = like.enchant;
  return option;
}

function deserializePotential(
  like: PotLike | undefined
): Potential | undefined {
  if (!like) return undefined;
  const pot = new Potential();
  pot.code = like.code;
  pot.optionType = like.optionType;
  pot.reqLevel = like.reqLevel;
  pot.summary = like.summary;
  pot.option = deserializeMap(like.option);
  return pot;
}

function deserializeSoulWeapon(like: SoulWeaponLike, gear: Gear): SoulWeapon {
  const soulWeapon = new SoulWeapon(gear);
  if (like.enchanted) soulWeapon.enchanted = like.enchanted;
  if (like.soul) soulWeapon.soul = like.soul;
  if (like.charge) soulWeapon.charge = like.charge;
  if (like.chargeOption)
    soulWeapon.chargeOption = deserializeMap(like.chargeOption);
  return soulWeapon;
}

function deserializeMap<K, V>(mapLike: [K, V][]): Map<K, V>;
function deserializeMap<K, V, VLike>(
  mapLike: [K, VLike][],
  func: (val: VLike) => V
): Map<K, V>;
function deserializeMap<K, V, VLike>(
  mapLike: [K, V][] | [K, VLike][],
  func?: (val: VLike) => V
): Map<K, V> {
  if (func) {
    return new Map((mapLike as [K, VLike][]).map((e) => [e[0], func(e[1])]));
  }
  return new Map(mapLike as [K, V][]);
}

function deserializeArray<T>(arr: T[]): T[];
function deserializeArray<T, TLike>(arr: TLike[], func: (e: TLike) => T): T[];
function deserializeArray<T, TLike>(
  arr: T[] | TLike[],
  func?: (e: TLike) => T
): T[] {
  if (func) {
    return [...(arr as TLike[])].map(func);
  }
  return [...(arr as T[])];
}
