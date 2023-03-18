import {
  Gear,
  GearIcon,
  GearOption,
  GearReq,
  Potential,
  Soul,
  SoulWeapon,
} from "@malib/gear";
import {
  IconLike,
  GearLike,
  OptionLike,
  ReqLike,
  PotLike,
  SoulLike,
  SoulWeaponLike,
} from "./interface";

export function deserializeGear(like: GearLike): Gear {
  const gear = new Gear();
  gear.itemID = like.id;
  gear.name = like.name;
  if (like.desc) gear.desc = like.desc;
  gear.icon = deserializeIcon(like.icon);
  if (like.anvilIcon && like.anvilName) {
    gear.anvilIcon = deserializeIcon(like.anvilIcon);
    gear.anvilName = like.anvilName;
  }
  gear.type = like.type;
  gear.req = deserializeReq(like.req);
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

function deserializeIcon(like: IconLike): GearIcon {
  const icon = new GearIcon();
  icon.id = like.id;
  icon.origin = deserializeArray(like.origin) as [number, number];
  return icon;
}

function deserializeReq(like: ReqLike): GearReq {
  const req = new GearReq();
  req.level = like.level;
  req.job = like.job;
  if (like.str) req.str = like.str;
  if (like.luk) req.luk = like.luk;
  if (like.dex) req.dex = like.dex;
  if (like.int) req.int = like.int;
  if (like.spec) req.specJob = like.spec;
  return req;
}

function deserializeOption(like: OptionLike): GearOption {
  const option = new GearOption();
  if (like.base) option.base = like.base;
  if (like.bonus) option.bonus = like.bonus;
  if (like.upgrade) option.upgrade = like.upgrade;
  if (like.enchant) option.enchant = like.enchant;
  return option;
}

function deserializePotential(like: PotLike): Potential {
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
  if (like.soul) soulWeapon.soul = deserializeSoul(like.soul);
  if (like.charge) soulWeapon.charge = like.charge;
  if (like.chargeOption)
    soulWeapon.chargeOption = deserializeMap(like.chargeOption);
  return soulWeapon;
}

function deserializeSoul(like: SoulLike): Soul {
  const soul = new Soul();
  soul.name = like.name;
  soul.skill = like.skill;
  soul.option = like.option;
  soul.multiplier = like.mul;
  return soul;
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
