import { Gear } from "../gear";
import { GearOption } from "../gearoption";
import { Potential } from "../potential";
import { SoulWeapon } from "../soul";
import { GearLike, OptionLike, PotLike, SoulWeaponLike } from "./interface";

/**
 * 장비를 순수 객체로 변환합니다.
 * @param like 변환할 장비.
 * @returns 변환된 순수 객체.
 */
export function gearToPlain(gear: Gear): GearLike {
  const like: GearLike = {} as GearLike;
  like.id = gear.itemID;
  like.name = gear.name;
  if (gear.desc.length > 0) like.desc = gear.desc;
  like.icon = gear.icon;
  if (gear.anvilIcon) like.anvilIcon = gear.anvilIcon;
  if (gear.anvilName) like.anvilName = gear.anvilName;
  like.type = gear.type;
  like.req = gear.req;
  like.props = serializeMap(gear.props);
  like.options = serializeMap(gear.options, serializeOption);
  if (gear.totalUpgradeCount > 0) like.tuc = gear.totalUpgradeCount;
  if (gear.upgradeCount > 0) like.up = gear.upgradeCount;
  if (gear.upgradeFailCount > 0) like.fail = gear.upgradeFailCount;
  if (gear.hammerCount > 0) like.hammer = gear.hammerCount;
  if (gear.maxStar > 0) like.maxStar = gear.maxStar;
  if (gear.star > 0) like.star = gear.star;
  if (gear.amazing) like.amazing = gear.amazing;
  if (gear.karma !== undefined) like.karma = gear.karma;
  if (gear.canPotential) like.canPot = gear.canPotential;
  if (gear.grade > 0) like.grade = gear.grade;
  if (gear.grade > 0 && gear.potentials.length > 0)
    like.pots = serializeArray(gear.potentials, serializePotential);
  if (gear.additionalGrade > 0) like.addGrade = gear.additionalGrade;
  if (gear.additionalGrade > 0 && gear.additionalPotentials.length > 0)
    like.addPots = serializeArray(
      gear.additionalPotentials,
      serializePotential
    );
  like.soulWeapon = serializeSoulWeapon(gear.soulWeapon);
  return like;
}

function serializeOption(option: GearOption): OptionLike {
  const like: OptionLike = {};
  if (option.base !== 0) like.base = option.base;
  if (option.bonus !== 0) like.bonus = option.bonus;
  if (option.upgrade !== 0) like.upgrade = option.upgrade;
  if (option.enchant !== 0) like.enchant = option.enchant;
  return like;
}

function serializePotential(pot: Potential | null): PotLike | null {
  return pot
    ? {
        code: pot.code,
        optionType: pot.optionType,
        reqLevel: pot.reqLevel,
        summary: pot.summary,
        option: serializeMap(pot.option),
      }
    : null;
}

function serializeSoulWeapon(soulWeapon: SoulWeapon): SoulWeaponLike {
  const like: SoulWeaponLike = {};
  if (soulWeapon.enchanted) like.enchanted = soulWeapon.enchanted;
  if (soulWeapon.soul) like.soul = soulWeapon.soul;
  if (soulWeapon.charge > 0) like.charge = soulWeapon.charge;
  if (soulWeapon.chargeOption.size > 0)
    like.chargeOption = serializeMap(soulWeapon.chargeOption);
  return like;
}

function serializeMap<K, V>(map: Map<K, V>): [K, V][];
function serializeMap<K, V, VLike>(
  map: Map<K, V>,
  func: (val: V) => VLike
): [K, VLike][];
function serializeMap<K, V, VLike>(
  map: Map<K, V>,
  func?: (val: V) => VLike
): [K, V][] | [K, VLike][] {
  if (func) {
    return [...map.entries()].map((e) => [e[0], func(e[1])]);
  }
  return [...map.entries()];
}
function serializeArray<T>(arr: T[]): T[];
function serializeArray<T, TLike>(arr: T[], func: (e: T) => TLike): TLike[];
function serializeArray<T, TLike>(
  arr: T[],
  func?: (e: T) => TLike
): T[] | TLike[] {
  if (func) {
    return [...arr].map(func);
  }
  return [...arr];
}
