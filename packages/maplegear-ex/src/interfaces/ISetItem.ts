export default interface ISetItemJson {
    [setItemID: string]: ISetItem
}

export interface ISetItem {
    setItemName: string
    ItemID: number[]
    Effect: {
        [count: string]: {
            [type: string]: number
        }
    }
    jokerPossible?: number
    zeroWeaponJokerPossible?: number
}
