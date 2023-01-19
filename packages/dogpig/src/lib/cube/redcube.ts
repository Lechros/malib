import { Gear, PotentialGrade } from "@malib/gear";

const optionWeights = {
  [PotentialGrade.normal]: {
    1: 3,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    9: 2,
    10: 2,
    11: 2,
    12: 2,
    13: 3,
  },
  [PotentialGrade.rare]: {
    10001: 3,
    10002: 3,
    10003: 3,
    10004: 3,
    10005: 3,
    10006: 3,
    10011: 2,
    10012: 2,
    10041: 3,
    10042: 3,
    10043: 3,
    10044: 3,
    10051: 1,
    10052: 1,
    10055: 1,
    10070: 1,
    10081: 2,
    10202: 1,
    10207: 1,
    10222: 1,
    10227: 1,
    10232: 1,
    10237: 1,
    10242: 1,
    10247: 1,
    10291: 1,
    10013: 2,
    10045: 2,
    10046: 2,
    10053: 2,
    10009: 2,
    10010: 2,
  },
  [PotentialGrade.epic]: {
    20041: 5,
    20042: 5,
    20043: 5,
    20044: 5,
    20045: 5,
    20046: 5,
    20051: 2,
    20052: 2,
    20053: 3,
    20055: 2,
    20070: 2,
    20086: 2,
    20202: 2,
    20207: 2,
    20291: 2,
    20366: 3,
    20401: 3,
    20406: 3,
  },
  [PotentialGrade.unique]: {
    30041: 5,
    30042: 5,
    30043: 5,
    30044: 5,
    30045: 6,
    30046: 6,
    30051: 3,
    30052: 3,
    30053: 4,
    30055: 4,
    30070: 3,
    30086: 4,
    30091: 1,
    30092: 1,
    30093: 1,
    30094: 1,
    30291: 3,
    30356: 4,
    30357: 4,
    30366: 4,
    30371: 4,
    30376: 4,
    30377: 2,
    30551: 4,
    30602: 3,
    31001: 4,
    31002: 4,
    31003: 4,
    31004: 4,
  },
  [PotentialGrade.legendary]: {
    40041: 4,
    40042: 4,
    40043: 4,
    40044: 4,
    40045: 4,
    40046: 4,
    40051: 2,
    40052: 2,
    40053: 4,
    40055: 2,
    40056: 4,
    40070: 2,
    40086: 3,
    40091: 2,
    40092: 2,
    40291: 2,
    40292: 2,
    40356: 3,
    40357: 3,
    40366: 3,
    40371: 3,
    40501: 3,
    40502: 3,
    40602: 4,
    40603: 2,
    40650: 3,
    40656: 3,
    41005: 3,
    41006: 3,
    41007: 3,
  },
};

export class RedCube {
  readonly grades = [
    PotentialGrade.rare,
    PotentialGrade.epic,
    PotentialGrade.unique,
    PotentialGrade.legendary,
  ] as const;

  readonly tierUpProbs = {
    [PotentialGrade.rare]: 0.06,
    [PotentialGrade.epic]: 0.018,
    [PotentialGrade.unique]: 0.003,
  } as const;

  use(gear: Gear): boolean {
    if (!(gear.grade in this.grades)) {
      return false;
    }

    gear.grade = this.tryTierUp(gear.grade);

    return true;
  }

  private tryTierUp(grade: PotentialGrade): PotentialGrade {
    if (grade in this.tierUpProbs) {
      const tierUpProb =
        this.tierUpProbs[grade as keyof typeof this.tierUpProbs];
      if (Math.random() < tierUpProb) {
        return grade + 1;
      }
    }
    return grade;
  }
}
