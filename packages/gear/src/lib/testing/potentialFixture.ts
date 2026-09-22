import { PotentialData, PotentialGrade } from '../data';

export function createPotentialData(
  data?: Partial<PotentialData>,
): PotentialData {
  return {
    grade: PotentialGrade.Rare,
    summary: '테스트용 잠재능력',
    option: {},

    ...data,
  };
}
