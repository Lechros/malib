import { readFileSync } from 'fs';
import { convert } from './convert';
import { WzGear } from './wz';
import { join } from 'path';

type Can = 0 | 1 | 2;

interface Cans {
  cannotUpgrade: boolean;
  canAddOption: Can;
  canPotential: Can;
  canAdditionalPotential: Can;
  maxStar: number;
}

test('Test canAddOption equals expected', () => {
  const gearData = readJson<Record<string, WzGear>>('./res/gear-data.json');
  const gearCanExpected = readJson<Record<string, Cans>>(
    './res/gear-can-expected.json',
  );

  for (const [id, info] of Object.entries(gearData)) {
    const cans = gearCanExpected[id];

    const data = convert(info);

    expect.soft(data.attributes.canAddOption, id).toEqual(cans.canAddOption);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function readJson<T>(relpath: string): T {
  const path = join(__dirname, relpath);
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json) as T;
}
