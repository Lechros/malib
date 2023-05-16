import { Gear } from "../gear";
import { GearOption } from "../gearoption";
import { Potential } from "../potential";
import { Soul } from "../soul";
import {
  GearLike,
  OptionLike,
  PotLike,
  SoulLike,
  SoulWeaponLike,
} from "./interface";
import { deserializeArray, deserializeMap } from "./util";

/**
 * 순수 객체를 장비로 변환합니다.
 * @param like 변환할 객체.
 * @returns 변환된 장비.
 */
export function plainToGear(like: GearLike): Gear {
  const gear = new Gear();
  gear.itemID = like.id;
  gear.name = like.n;
  if (like.d) gear.desc = like.d;
  gear.icon = like.i;
  if (like.i2 && like.n2) {
    gear.anvilIcon = like.i2;
    gear.anvilName = like.n2;
  }
  gear.type = like.t;
  gear.req = like.r;
  gear.props = deserializeMap(like.pr);
  gear.options = deserializeMap(like.o, deserializeOption);
  if (like.c) gear.totalUpgradeCount = like.c;
  if (like.up) gear.upgradeCount = like.up;
  if (like.f) gear.upgradeFailCount = like.f;
  if (like.h) gear.hammerCount = like.h;
  if (like.ec) gear.exceptionalTotalUpgradeCount = like.ec;
  if (like.eu) gear.exceptionalUpgradeCount = like.eu;
  if (like.eo) gear.exceptionalOptions = deserializeMap(like.eo);
  if (like.m) gear.maxStar = like.m;
  if (like.s) gear.star = like.s;
  if (like.a) gear.amazing = like.a;
  if (like.k) gear.karma = like.k;
  if (like.cp) gear.canPotential = like.cp;
  if (like.g) gear.grade = like.g;
  if (like.p) gear.potentials = deserializeArray(like.p, deserializePotential);
  if (like.g2) gear.additionalGrade = like.g2;
  if (like.p2)
    gear.additionalPotentials = deserializeArray(like.p2, deserializePotential);
  deserializeSoulWeapon(like.w, gear);
  return gear;
}

function deserializeOption(like: OptionLike): GearOption {
  const option = new GearOption();
  option.base = like[0];
  option.bonus = like[1];
  option.upgrade = like[2];
  option.enchant = like[3];
  return option;
}

function deserializePotential(like: PotLike | null): Potential | null {
  if (!like) return null;
  const pot = new Potential();
  pot.code = like.c;
  pot.optionType = like.t;
  pot.reqLevel = like.l;
  pot.summary = like.s;
  pot.option = deserializeMap(like.o);
  return pot;
}

function deserializeSoulWeapon(
  like: SoulWeaponLike | undefined,
  gear: Gear
): void {
  if (like) {
    const soulWeapon = gear.soulWeapon;
    if (like?.e) soulWeapon.enchanted = like.e;
    if (like?.s) soulWeapon.soul = deserializeSoul(like.s);
    if (like?.c) soulWeapon.charge = like.c;
    if (like?.o) soulWeapon.chargeOption = deserializeMap(like.o);
  }
}

function deserializeSoul(like: SoulLike | undefined): Soul | undefined {
  if (!like) return undefined;
  return {
    name: like.n,
    skill: like.s,
    option: deserializeMap(like.o),
    multiplier: like.m,
  };
}
