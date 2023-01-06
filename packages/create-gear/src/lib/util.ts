type Enum = {
  [key: string]: number | string;
};

export function asEnum<T extends Enum>(key: string, type: T): number {
  if (!(key in type)) {
    throw Error(`${key} key does not exist in ${type}!`);
  }
  return type[key] as number;
}
