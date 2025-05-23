import { GearGender } from '@malib/gear';
import { getGearType } from './gearType';
import { getGender } from './gender';

test('Test gender', () => {
  const gearData = {
    id: 1040122,
    name: '블랙 네오스',
    icon: '1040122',
    reqJob: 1,
    reqLevel: 100,
    incSTR: 6,
    incDEX: 2,
    incACC: 2,
    incPDD: 105,
    tuc: 8,
    setItemID: 367,
  };
  const expected = GearGender.Male;

  const actual = getGender(gearData, getGearType(gearData.id));

  expect(actual).toBe(expected);
});
