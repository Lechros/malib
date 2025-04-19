import { convert } from './convert';
import _expectedData from './res/gear-data-expected.json';
import _rawData from './res/gear-data-raw.json';
import { WzGear } from './wz';

const rawData = _rawData as Record<string, WzGear>;
const expectedData = _expectedData as Record<string, unknown>;

test.skip('Convert result is equal to WzJson version', () => {
  for (const [id, data] of Object.entries<WzGear>(rawData)) {
    const expected = expectedData[id];
    if (typeof expected === 'object' && expected !== null) {
      if ('potentials' in expected) {
        (expected as { potentials: unknown[] }).potentials = (
          expected as { potentials: unknown[] }
        ).potentials.filter((pot) => pot);
      }
      if ('attributes' in expected && typeof expected.attributes === 'object') {
        delete (expected as { attributes: { blockGoldenHammer?: boolean } })
          .attributes.blockGoldenHammer;
      }
    }

    const actual = convert(data);

    expect(actual).toEqual(expected);
  }
});
