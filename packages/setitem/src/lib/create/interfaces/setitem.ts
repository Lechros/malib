export interface SetItemDataMap {
  [setItemID: string]: SetItemData;
}

export interface SetItemData {
  name: string;
  itemIDs: number[];
  effects: Record<string, Record<string, number>>;
  jokerPossible?: boolean;
  zeroWeaponJokerPossible?: boolean;
}
