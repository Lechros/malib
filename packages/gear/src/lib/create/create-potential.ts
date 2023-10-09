import { GearPropType, Potential } from "../..";
import { ItemOption, ItemOptionJson } from "./interfaces/itemoption";
import itemOptionJson from "../../res/itemoption.json";

/**
 * KMS 잠재옵션 정보를 제공합니다.
 *
 * 이 객체를 수정할 경우 관련 함수의 작동이 변경될 수 있습니다.
 */
export const itemOptionData: ItemOptionJson = itemOptionJson;

/**
 * 잠재옵션 정보로부터 잠재옵션을 생성합니다.
 * 잠재옵션에 `incDAMr` 속성과 `boss` 속성이 존재할 경우 `incBDR` 속성으로 대체됩니다.
 * @param node 잠재옵션 정보 노드.
 * @param code 잠재옵션 코드.
 * @param potentialLevel 장비의 착용 가능 레벨로 계산되는 잠재옵션 레벨. `1`부터 `25`까지의 값입니다.
 * @returns 정보에 해당하는 잠재옵션.
 */
export function createPotentialFromNode(
  node: ItemOption,
  code: number,
  potentialLevel: number
): Potential {
  const potential = new Potential();
  potential.code = code;
  potential.optionType = node.optionType ?? 0;
  potential.reqLevel = node.reqLevel ?? 0;
  potential.summary = node.string;
  for (const [key, value] of Object.entries(node.level[potentialLevel])) {
    const type = GearPropType[key as keyof typeof GearPropType];
    if (typeof value === "number") {
      potential.option.set(type, value);
    }
  }
  const incDAMr = potential.option.get(GearPropType.incDAMr) ?? 0;
  if (incDAMr > 0 && (potential.option.get(GearPropType.boss) ?? 0) > 0) {
    potential.option.delete(GearPropType.incDAMr);
    potential.option.delete(GearPropType.boss);
    potential.option.set(GearPropType.incBDR, incDAMr);
    potential.summary = potential.summary.replace("#incDAMr", "#incBDR");
  }
  return potential;
}

/**
 * 잠재옵션 코드로부터 잠재옵션을 생성합니다.
 * 잠재옵션에 `incDAMr` 속성과 `boss` 속성이 존재할 경우 `incBDR` 속성으로 대체됩니다.
 * @param code 잠재옵션 코드.
 * @param potentialLevel 장비의 착용 가능 레벨로 계산되는 잠재옵션 레벨. `1`부터 `25`까지의 값입니다.
 * @returns 코드에 해당하는 잠재옵션. 존재하지 않을 경우 `undefined`를 반환합니다.
 */
export function createPotentialFromCode(
  code: number,
  potentialLevel: number
): Potential | undefined {
  if (!(code in itemOptionJson)) {
    return undefined;
  }

  return createPotentialFromNode(itemOptionData[code], code, potentialLevel);
}
