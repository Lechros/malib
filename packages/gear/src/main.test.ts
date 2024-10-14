import { add } from './main';

test('adds 1 + 2 to equal 3', () => {
  const a: number = 1;
  const b = 2;
  expect(add(a, b)).toBe(3);
});
