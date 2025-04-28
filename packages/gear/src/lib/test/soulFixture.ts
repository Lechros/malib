import { SoulData } from '../data';

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
