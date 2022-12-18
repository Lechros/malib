export default interface IGearDataJson {
    [gearID: string]: IGearData
}

export interface IGearData {
    name: string
    desc?: string
    icon: number
    origin: [number, number]
    info?: IGearInfo
    option?: ISpecialOptions
    addition?: IAdditions
}

export interface IGearInfo {
    incSTR?: number
    incDEX?: number
    incINT?: number
    incLUK?: number
    incMHP?: number
    incMHPr?: number
    incMMP?: number
    incMMPr?: number
    incPAD?: number
    incMAD?: number
    incPDD?: number
    incMDD?: number
    incACC?: number
    incEVA?: number
    incSpeed?: number
    incJump?: number
    incARC?: number
    incCraft?: number
    knockback?: number
    bdR?: number
    imdR?: number
    damR?: number
    incCHUC?: number
    attackSpeed?: number
    tuc?: number
    setItemID?: number
    durability?: number
    bossReward?: number
    reduceReq?: number
    reqLevel?: number
    reqSTR?: number
    reqDEX?: number
    reqINT?: number
    reqLUK?: number
    reqJob?: number
    reqSpecJob?: number
    only?: number
    quest?: number
    tradeBlock?: number
    equipTradeBlock?: number
    accountSharable?: number
    sharableOnce?: number
    onlyEquip?: number
    notExtend?: number
    blockGoldHammer?: number
    noPotential?: number
    fixedPotential?: number
    specialGrade?: number
    fixedGrade?: number
    cantRepair?: number
    superiorEqp?: number
    exceptUpgrade?: number
    tradeAvailable?: number
    accountShareTag?: number
    jokerToSetItem?: number
    charismaEXP?: number
    senseEXP?: number
    insightEXP?: number
    willEXP?: number
    craftEXP?: number
    charmEXP?: number
}

export interface ISpecialOptions {
    0: ISpecialOption
    1?: ISpecialOption
    2?: ISpecialOption
}

export interface ISpecialOption {
    option: number
    level: number
}

export interface IAdditions {
    boss?: IAddition
    critical?: IAddition
    statinc?: IAdditionStatinc
}

export interface IAddition {
    prob?: number
    damage?: number
}

export interface IAdditionStatinc {
    [type: string]: number
}
