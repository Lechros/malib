import { Gear, GearCapability, GearData } from '@malib/gear';
import { readFileSync } from 'fs';
import { join } from 'path';
import { convert } from './convert';
import { WzGear } from './wz';

type Can = 0 | 1 | 2;

interface Cans {
  cannotUpgrade: boolean;
  canAddOption: Can;
  canPotential: Can;
  canAdditionalPotential: Can;
  maxStar: number;
}

test('Test canAddOption, canPotential, canAdditionalPotential equals expected', () => {
  const gearData = readJson<Record<string, WzGear>>('./res/gear-data.json');
  const gearCanExpected = readJson<Record<string, Cans>>(
    './res/gear-can-expected.json',
  );

  for (const [id, info] of Object.entries(gearData)) {
    const cans = gearCanExpected[id];

    const data = convert(info);

    checkAddOption(data, cans, id);
    checkPotential(data, cans, id);
    checkAdditionalPotential(data, cans, id);
    checkScroll(data, cans, id);
    checkStarforce(data, cans, id);
  }
});

test.skip('Temp test', () => {
  const gearData = readJson<Record<string, WzGear>>('./res/gear-data.json');
  const id = 1114207;
  const info = gearData[id];
  const data = convert(info);
  const gear = new Gear(data);

  console.log(gear);
  console.log('potentials:', gear.potentials);
  console.log('maxStar:', gear.maxStar);
});

function checkAddOption(data: GearData, cans: Cans, id: string) {
  expect.soft(data.attributes.canAddOption, id).toBe(cans.canAddOption);
}

function checkPotential(data: GearData, cans: Cans, id: string) {
  expect.soft(data.attributes.canPotential, id).toBe(cans.canPotential);
}

function checkAdditionalPotential(data: GearData, cans: Cans, id: string) {
  // canPotential이 Cannot일 경우 canAdditionalPotential도 Cannot이어야 함
  if (data.attributes.canPotential === GearCapability.Cannot) {
    expect
      .soft(data.attributes.canAdditionalPotential, id)
      .toBe(GearCapability.Cannot);
  } else {
    // 글로리온 링 류는 Can이 올바른 결과지만, 기존에 Cannot으로 계산되던 것을 처리
    if (isGlorionRing(data.meta.id)) {
      expect(data.attributes.canAdditionalPotential, id).toBe(
        GearCapability.Can,
      );
    } else {
      expect
        .soft(data.attributes.canAdditionalPotential, id)
        .toBe(cans.canAdditionalPotential);
    }
  }
}

function checkScroll(data: GearData, cans: Cans, id: string) {
  // tuc이 없으면 Cannot으로, cannotUpgrade이면 Fixed로 설정
  if (
    data.scrollUpgradeableCount === undefined ||
    data.scrollUpgradeableCount === 0
  ) {
    expect.soft(data.attributes.canScroll, id).toBe(GearCapability.Cannot);
  } else if (cans.cannotUpgrade) {
    expect.soft(data.attributes.canScroll, id).toBe(GearCapability.Fixed);
  } else {
    expect.soft(data.attributes.canScroll, id).toBe(GearCapability.Can);
  }
}

function checkStarforce(data: GearData, cans: Cans, id: string) {
  // 프리미엄 PC방 칭호 incCHUC 처리
  const gear = new Gear(data);
  if (gear.meta.id === 1142145) {
    return;
  }
  // maxStar > 0인 경우에만 스타포스 강화 가능
  if (cans.maxStar > 0) {
    // cannotUpgrade가 설정된 장비는 Fixed로 설정
    if (cans.cannotUpgrade) {
      expect.soft(gear.attributes.canStarforce, id).toBe(GearCapability.Fixed);
    } else {
      expect.soft(gear.attributes.canStarforce, id).toBe(GearCapability.Can);
    }
    // 최대 스타포스 강화 확장 대응
    const maxStar = cans.maxStar === 25 ? 30 : cans.maxStar;
    expect.soft(gear.maxStar, id).toBe(maxStar);
  } else {
    expect.soft(gear.attributes.canStarforce, id).toBe(GearCapability.Cannot);
    expect.soft(gear.maxStar, id).toBe(0);
  }
}

function isGlorionRing(id: number): boolean {
  const glorionRings = [
    1114313, 1114314, 1114315, 1114316, 1114319, 1114320, 1114321, 1114322,
    1114324,
  ];
  return glorionRings.includes(id);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function readJson<T>(relpath: string): T {
  const path = join(__dirname, relpath);
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json) as T;
}
