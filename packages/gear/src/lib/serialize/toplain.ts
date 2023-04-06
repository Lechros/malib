import { Gear } from "../gear";
import { GearOption } from "../gearoption";
import { Potential } from "../potential";
import { SoulWeapon } from "../soul";
import { GearLike, OptionLike, PotLike, SoulWeaponLike } from "./interface";
import { serializeArray, serializeMap } from "./util";

/**
 * 장비를 순수 객체로 변환합니다.
 * @param like 변환할 장비.
 * @returns 변환된 순수 객체.
 */
export function gearToPlain(gear: Gear): GearLike {
  const like: GearLike = {} as GearLike;
  like.id = gear.itemID;
  like.n = gear.name;
  if (gear.desc.length > 0) like.d = gear.desc;
  like.i = gear.icon;
  if (gear.anvilIcon) like.i2 = gear.anvilIcon;
  if (gear.anvilName) like.n2 = gear.anvilName;
  like.t = gear.type;
  like.r = gear.req;
  like.pr = serializeMap(gear.props, (val) => val !== 0);
  like.o = serializeMap(gear.options, (opt) => !opt.empty, serializeOption);
  if (gear.totalUpgradeCount > 0) like.c = gear.totalUpgradeCount;
  if (gear.upgradeCount > 0) like.up = gear.upgradeCount;
  if (gear.upgradeFailCount > 0) like.f = gear.upgradeFailCount;
  if (gear.hammerCount > 0) like.h = gear.hammerCount;
  if (gear.maxStar > 0) like.m = gear.maxStar;
  if (gear.star > 0) like.s = gear.star;
  if (gear.amazing) like.a = gear.amazing;
  if (gear.karma !== undefined) like.k = gear.karma;
  if (gear.canPotential) like.cp = gear.canPotential;
  if (gear.grade > 0) like.g = gear.grade;
  if (gear.grade > 0 && gear.potentials.length > 0)
    like.p = serializeArray(gear.potentials, undefined, serializePotential);
  if (gear.additionalGrade > 0) like.g2 = gear.additionalGrade;
  if (gear.additionalGrade > 0 && gear.additionalPotentials.length > 0)
    like.p2 = serializeArray(
      gear.additionalPotentials,
      undefined,
      serializePotential
    );
  const soulWeapon = serializeSoulWeapon(gear.soulWeapon);
  if (soulWeapon) like.w = soulWeapon;
  return like;
}

function serializeOption(option: GearOption): OptionLike {
  return [option.base, option.bonus, option.upgrade, option.enchant];
}

function serializePotential(pot: Potential | null): PotLike | null {
  return pot
    ? {
        c: pot.code,
        t: pot.optionType,
        l: pot.reqLevel,
        s: pot.summary,
        o: serializeMap(pot.option, (val) => val !== 0),
      }
    : null;
}

function serializeSoulWeapon(
  soulWeapon: SoulWeapon
): SoulWeaponLike | undefined {
  const like: SoulWeaponLike = {};
  if (soulWeapon.enchanted) like.e = soulWeapon.enchanted;
  if (soulWeapon.soul) like.s = soulWeapon.soul;
  if (soulWeapon.charge > 0) like.c = soulWeapon.charge;
  if (soulWeapon.chargeOption.size > 0)
    like.o = serializeMap(soulWeapon.chargeOption, (val) => val !== 0);

  if (Object.keys(like).length > 0) return like;
  else return undefined;
}
