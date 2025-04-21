import { readFileSync } from 'fs';
import { convert } from './convert';
import { WzGear } from './wz';
import { join } from 'path';
import { PotentialCan } from '@malib/gear';

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

    expect.soft(data.attributes.canAddOption, id).toBe(cans.canAddOption);
    expect.soft(data.attributes.canPotential, id).toBe(cans.canPotential);
    // canPotential이 Cannot일 경우 canAdditionalPotential도 Cannot이어야 함
    if (data.attributes.canPotential === PotentialCan.Cannot) {
      expect
        .soft(data.attributes.canAdditionalPotential, id)
        .toBe(PotentialCan.Cannot);
    } else {
      // 글로리온 링 류는 Can이 올바른 결과지만, 기존에 Cannot으로 계산되던 것을 처리
      if (isGlorionRing(data.meta.id)) {
        expect(data.attributes.canAdditionalPotential, id).toBe(
          PotentialCan.Can,
        );
      } else {
        expect
          .soft(data.attributes.canAdditionalPotential, id)
          .toBe(cans.canAdditionalPotential);
      }
    }
  }
});

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
