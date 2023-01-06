import { Gear } from "@malib/gear";
import { gearJson, itemOptionJson } from "@malib/resource";
import { createGearFromNode } from "@malib/create-gear";

export function createGearFromID(id: number): Gear | undefined {
  const node = gearJson[id];
  if (!node) {
    return undefined;
  }
  return createGearFromNode(node, id, (code) => itemOptionJson[code]);
}
