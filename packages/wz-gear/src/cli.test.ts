/*
 * This file is written in .test.ts to avoid setting up cli environment
 */
import { readFileSync, writeFileSync } from 'fs';
import { convert, WzGear } from '.';
import { join } from 'path';

const inPath = '../tmp/gear-data.json';
const outPath = '../tmp/gear-data-converted.json';

test.skip('Run', () => {
  // Read the input file
  const data = readJson<Record<string, WzGear>>(inPath);
  // Convert the data
  const outData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, convert(value)]),
  );
  // Write the output file
  writeJson(outPath, outData);
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function readJson<T>(relpath: string): T {
  const path = join(__dirname, relpath);
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json) as T;
}

function writeJson(relpath: string, data: unknown) {
  const path = join(__dirname, relpath);
  const json = JSON.stringify(data);
  writeFileSync(path, json, 'utf-8');
}
