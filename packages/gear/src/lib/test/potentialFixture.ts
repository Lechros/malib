import { PotentialGrade } from '../data';
import { potentialPatch } from './gearPatch';

type PotentialFixture = Parameters<typeof potentialPatch>[0];

export const potLegendary_Bo40_Ma12_Ma9: PotentialFixture = [
  PotentialGrade.Legendary,
  [
    {
      grade: PotentialGrade.Legendary,
      summary: '보스 몬스터 공격 시 데미지 : +40%',
      option: {
        bossDamage: 40,
      },
    },
    {
      grade: PotentialGrade.Legendary,
      summary: '마력 : +12%',
      option: {
        magicPowerRate: 12,
      },
    },
    {
      grade: PotentialGrade.Unique,
      summary: '마력 : +9%',
      option: {
        magicPowerRate: 9,
      },
    },
  ],
];

export const potUnique_Ma9_Ma9_Cr6: PotentialFixture = [
  PotentialGrade.Unique,
  [
    {
      grade: PotentialGrade.Unique,
      summary: '마력 : +9%',
      option: {
        magicPowerRate: 9,
      },
    },
    {
      grade: PotentialGrade.Unique,
      summary: '마력 : +9%',
      option: {
        magicPowerRate: 9,
      },
    },
    {
      grade: PotentialGrade.Epic,
      summary: '크리티컬 확률 : +6%',
      option: {
        criticalRate: 6,
      },
    },
  ],
];
