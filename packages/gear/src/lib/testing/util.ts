export function joinEach<T1 extends unknown[], T2 extends unknown[]>(
  prefix: [...T1],
  items: [...T2][],
): [...T1, ...T2][] {
  return items.map((value) => [...prefix, ...value]);
}
