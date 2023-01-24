import { Gear, Potential, PotentialGrade } from "@malib/gear";

export interface Cube {
  canUse(gear: Gear): boolean;
  use(gear: Gear): boolean;
  getOption(gear: Gear): CubeResult | undefined;
  setOption(gear: Gear, option: CubeResult): Gear;
}

export interface CubeResult {
  grade: PotentialGrade;
  options: Potential[];
}
