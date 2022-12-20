export default interface ITitleJson {
    [itemID: string]: ITitle
}

export interface ITitle {
    name: string
    desc?: string
    incEXPr?: number
    incPAD?: number
    incMAD?: number
    incPDD?: number
    incSTR?: number
    incDEX?: number
    incINT?: number
    incLUK?: number
    incCr?: number
    incCriticalDamage?: number
    nbdR?: number
    bdR?: number
    imdR?: number
    incMHP?: number
    incMMP?: number
    incARC?: number
    incCHUC?: number
}
