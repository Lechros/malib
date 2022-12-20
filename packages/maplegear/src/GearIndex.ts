import { getGearIDNames } from "maplegear-resource";

/**
 * 장비 이름으로부터 장비 ID를 일정한 속도로 찾는 기능을 제공합니다.
 */
export default class GearIndex {
  private static readonly index: Map<string, number> = new Map();

  /**
   * 내부에 장비 정보를 로드합니다.
   */
  static load(): void {
    for(const [id, name] of getGearIDNames()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if(this.index.has(name) || (this.index.get(name)! < id)) {
        continue;
      }
      this.index.set(name, id);
    }
  }

  /**
   * 장비 이름에 해당하는 장비 ID를 검색합니다.
   * @param gearName 장비 이름
   * @returns 장비 ID; 존재하지 않을 경우 `undefined`
   */
  static getGearID(gearName: string): number | undefined {
    if(Object.keys(this.index).length <= 0) {
      this.load();
    }

    return this.index.get(gearName);
  }
}
