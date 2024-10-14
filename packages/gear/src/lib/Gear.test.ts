import { GearData, PotentialGrade } from './data';
import { Gear } from './Gear';

describe('Gear constructor', () => {
  it('should accept GearData', () => {
    const data = {
      meta: {
        id: 0,
        version: 1,
      },
      name: '',
      icon: '0',
      type: 0,
      req: {
        level: 0,
        str: 0,
        luk: 0,
        dex: 0,
        int: 0,
        job: 0,
      },
      attributes: {},

      baseOption: {},
      addOption: {},
      scrollOption: {},
      starforceOption: {},

      scrollUpgradeCount: 0,
      scrollResilienceCount: 0,
      scrollUpgradeableCount: 0,
      goldenHammer: 0,

      star: 0,
      maxStar: 0,
      starScroll: false,

      soulEnchanted: false,
      soulCharge: 0,
      soulChargeOption: {},

      potentialGrade: PotentialGrade.Normal,
      potentials: [null, null, null],
      additionalPotentialGrade: PotentialGrade.Normal,
      additionalPotentials: [null, null, null],

      exceptionalOption: {},
      exceptionalUpgradeCount: 0,
      exceptionalUpgradeableCount: 0,
    } satisfies GearData;

    const gear = new Gear(data);

    expect(gear).toBeInstanceOf(Gear);
  });
});
