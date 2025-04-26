import { SoulData } from '../data';
import { soulPatch } from './gearPatch';

export function createSoulData(data?: Partial<SoulData>): SoulData {
  return {
    name: '테스트용 소울',
    skill: '테스트용 소울 스킬',
    option: {
      str: 24,
    },

    ...data,
  };
}

type SoulFixture = Parameters<typeof soulPatch>[0];

export const soulDemian_Padr_1000: SoulFixture = [
  {
    name: '위대한 데미안의 소울',
    skill: '파멸의 검',
    option: {
      attackPowerRate: 3,
    },
    chargeFactor: 2,
  },
  1000,
];
