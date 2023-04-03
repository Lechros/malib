import typia from "typia";
import { GearLike } from "./interface";

export const isGearLike = (input: unknown): input is GearLike => {
  const $io0 = (input: any): boolean =>
    "number" === typeof input.id &&
    "string" === typeof input.name &&
    (undefined === input.desc || "string" === typeof input.desc) &&
    true &&
    true &&
    (undefined === input.anvilName || "string" === typeof input.anvilName) &&
    true &&
    true &&
    Array.isArray(input.props) &&
    input.props.every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        true &&
        "number" === typeof elem[1]
    ) &&
    Array.isArray(input.options) &&
    input.options.every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        true &&
        "object" === typeof elem[1] &&
        null !== elem[1] &&
        false === Array.isArray(elem[1]) &&
        $io1(elem[1])
    ) &&
    (undefined === input.tuc || "number" === typeof input.tuc) &&
    (undefined === input.up || "number" === typeof input.up) &&
    (undefined === input.fail || "number" === typeof input.fail) &&
    (undefined === input.hammer || "number" === typeof input.hammer) &&
    (undefined === input.maxStar || "number" === typeof input.maxStar) &&
    (undefined === input.star || "number" === typeof input.star) &&
    (undefined === input.amazing || "boolean" === typeof input.amazing) &&
    (undefined === input.karma || "number" === typeof input.karma) &&
    (undefined === input.canPot || "boolean" === typeof input.canPot) &&
    true &&
    (undefined === input.pots ||
      (Array.isArray(input.pots) &&
        input.pots.every(
          (elem: any) =>
            undefined === elem ||
            ("object" === typeof elem && null !== elem && $io2(elem))
        ))) &&
    true &&
    (undefined === input.addPots ||
      (Array.isArray(input.addPots) &&
        input.addPots.every(
          (elem: any) =>
            undefined === elem ||
            ("object" === typeof elem && null !== elem && $io2(elem))
        ))) &&
    "object" === typeof input.soulWeapon &&
    null !== input.soulWeapon &&
    false === Array.isArray(input.soulWeapon) &&
    $io3(input.soulWeapon);
  const $io1 = (input: any): boolean =>
    (undefined === input.base || "number" === typeof input.base) &&
    (undefined === input.bonus || "number" === typeof input.bonus) &&
    (undefined === input.upgrade || "number" === typeof input.upgrade) &&
    (undefined === input.enchant || "number" === typeof input.enchant);
  const $io2 = (input: any): boolean =>
    "number" === typeof input.code &&
    "number" === typeof input.optionType &&
    "number" === typeof input.reqLevel &&
    "string" === typeof input.summary &&
    Array.isArray(input.option) &&
    input.option.every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        true &&
        "number" === typeof elem[1]
    );
  const $io3 = (input: any): boolean =>
    (undefined === input.enchanted || "boolean" === typeof input.enchanted) &&
    true &&
    (undefined === input.charge || "number" === typeof input.charge) &&
    (undefined === input.chargeOption ||
      (Array.isArray(input.chargeOption) &&
        input.chargeOption.every(
          (elem: any) =>
            Array.isArray(elem) &&
            elem.length === 2 &&
            true &&
            "number" === typeof elem[1]
        )));
  return "object" === typeof input && null !== input && $io0(input);
};
