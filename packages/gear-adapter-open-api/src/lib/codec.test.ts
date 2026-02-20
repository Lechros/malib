import { decode, encode } from './codec';

test.each([
  ['KEPCOOGA', 1005981],
  ['KEPDJDOD', 1012402],
  ['KEPAJFKH', 1022246],
  ['KEPBJHMD', 1032022],
  ['KEPGJDNF', 1042434],
  ['KEPEJFGH', 1062286],
  ['KEPFIBNB', 1073630],
])('decode(%s) -> %i', (encoded, expected) => {
  expect(decode(encoded)).toBe(expected);
});

test.each([
  [1005981, 'KEPCOOGA'],
  [1012402, 'KEPDJDOD'],
  [1022246, 'KEPAJFKH'],
  [1032022, 'KEPBJHMD'],
  [1042434, 'KEPGJDNF'],
  [1062286, 'KEPEJFGH'],
  [1073630, 'KEPFIBNB'],
])('encode(%i) -> %s', (id, expected) => {
  expect(encode(id)).toBe(expected);
});
