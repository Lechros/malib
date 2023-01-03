export default interface IGearDataJson {
    [gearID: string]: IGearData
}

export interface IGearData {
    name: string
    desc?: string
    icon: number
    origin: [number, number]
    req?: IGearReq
    props?: number
    options?: number
    tuc?: number
    pots?: ISpecialOption[]
}

export interface IGearReq {
    level: number
    str: number
    luk: number
    dex: number
    int: number
    job: number
    specJob: number
}

export interface ISpecialOption {
    option: number
    level: number
}
