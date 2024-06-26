import { PotentialRepository } from "../..";
import { GearRepository } from "./../../lib/create/create-gear";
import gearJson from "./res/gear.json";
import itemOptionJson from "./res/itemoption.json";

const potentialRepository = new PotentialRepository(itemOptionJson);

const gearRepository = new GearRepository(gearJson, potentialRepository);

test("create all gears in KMS gear data", () => {
  for (const id of gearRepository.ids()) {
    expect(gearRepository.createGearFromId(id)).not.toBeUndefined();
  }
});

describe("gear canPotential", () => {
  it.each([
    ["하이네스 워리어헬름", 1003797, true],
    ["에레브의 광휘", 1352972, true],
    ["골드 어비스 엠블렘", 1190540, true],
    ["이터널 플레임 링", 1114324, true],
    ["어웨이크 링", 1114318, true],
    ["테네브리스 원정대 반지", 1114307, true],
    ["글로리온 링 : 슈프림", 1114316, true],
    ["카오스 링", 1114305, true],
    ["어드벤처 딥다크 크리티컬 링", 1114312, false],
    ["SS급 마스터 쥬얼링", 1113231, true],
    ["결속의 반지", 1114302, true],
    ["코스모스 링", 1114303, true],
    ["벤젼스 링", 1114300, true],
    ['오닉스 링 "완성"', 1114226, true],
    ['리부트 오닉스 링 "완성"', 1114238, false],
    ["벤젼스 링", 1114300, true],
    ["악몽의 주인 격파자", 1143029, false],
    ["정령의 펜던트", 1122017, false],
    ["핑크빛 성배", 1162025, false],
    ["크리스탈 웬투스 뱃지", 1182087, false],
    ["무공의 장갑", 1082393, false],
    ["베테랑 크로스 숄더", 1152069, false],
  ])("%s(%s) should be %s", (name, id, expected) => {
    const gear = gearRepository.createGearFromId(id);
    expect(gear?.name).toBe(name);
    expect(gear?.canPotential).toBe(expected);
  });
});

test("exceptional upgrade count", () => {
  expect(
    gearRepository.createGearFromId(1003797)?.exceptionalTotalUpgradeCount
  ).toBe(0);
  expect(
    gearRepository.createGearFromId(1012632)?.exceptionalTotalUpgradeCount
  ).toBe(1);
  expect(
    gearRepository.createGearFromId(1132308)?.exceptionalTotalUpgradeCount
  ).toBe(1);
  expect(
    gearRepository.createGearFromId(1022278)?.exceptionalTotalUpgradeCount
  ).toBe(1);
});
