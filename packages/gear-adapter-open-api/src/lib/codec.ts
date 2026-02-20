import { OpenApiFormatError } from './exception';

const BASE = 10;

export function encode(id: number): string {
  if (!Number.isInteger(id)) {
    throw new TypeError('id must be an integer');
  }
  if (id < 0 || id >= BASE ** codecMap.length) {
    throw new TypeError('id must be a valid positive value');
  }
  let result = '';
  for (let i = codecMap.length - 1; i >= 0; i--) {
    const codecLine = codecMap[i];
    const char = codecLine[id % BASE];
    result = char + result;
    id = Math.floor(id / BASE);
  }
  return result;
}

export function decode(encodedId: string): number {
  if (encodedId.length > codecMap.length) {
    throw new OpenApiFormatError(
      `encodedId must be less than ${codecMap.length} characters long`,
    );
  }
  let result = 0;
  let digit = 1;
  for (let i = 0; i < encodedId.length; i++) {
    const char = encodedId[encodedId.length - i - 1];
    const codecLine = codecMap[codecMap.length - i - 1];
    const index = codecLine.indexOf(char);
    if (index === -1) {
      throw new OpenApiFormatError(`Unsupported encodedId value: ${encodedId}`);
    }
    result += index * digit;
    digit *= 10;
  }
  return result;
}

/**
 * 2026-02-20.
 */
const codecMap = [
  'K_________',
  '_E________',
  'PONMLKJIHG',
  'CDABGHEFKL',
  'LKJIPONMDC',
  'HGFEDCBAPO',
  'OPMNKLIJGH',
  'BADCFEHGJI',
];
