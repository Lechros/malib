export function getVersion(data: object): number | undefined {
  // V1
  if ('meta' in data) {
    const meta = data.meta;
    if (
      typeof meta === 'object' &&
      meta !== null &&
      'version' in meta &&
      typeof meta.version === 'number'
    ) {
      return meta.version;
    }
  }
  // V2+
  if ('version' in data && typeof data.version === 'number') {
    return data.version;
  }
  return undefined;
}
