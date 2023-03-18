export interface DataType {
  [id: number]: {
    name: string;
  };
}

/**
 * 아이템 이름과 아이템 ID를 인덱스합니다.
 */
export class ItemIndex {
  private index: Map<string, number>;

  constructor(data: DataType) {
    this.index = new Map();
    for (const [id, node] of Object.entries(data)) {
      const name = node.name;
      if (!this.index.has(name)) {
        this.index.set(name, Number(id));
      }
    }
  }

  /**
   * 지정한 이름과 연결된 아이템 ID를 가져옵니다.
   * @param name 아이템 이름.
   * @returns 연결된 아이템 ID. 아이템 ID가 존재하지 않을 경우 `undefined`를 반환합니다.
   * 동일한 아이템 이름을 가진 아이템이 여러 개일 경우, 가장 작은 아이템 ID를 반환합니다.
   * (ES2015 환경이 아닐 경우 가장 작은 아이템 ID이 아닐 수 있습니다.)
   */
  getId(name: string): number | undefined {
    return this.index.get(name);
  }
}
