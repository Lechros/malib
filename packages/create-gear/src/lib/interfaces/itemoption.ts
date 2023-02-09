export interface ItemOptionJson {
  [gearID: string]: ItemOption;
}

export interface ItemOption {
  optionType?: number;
  reqLevel?: number;
  string: string;
  level: {
    [level: number]: {
      [name: string]: number | string;
    };
  };
}
