import { gearJson, IItemOption, itemOptionJson } from "@malib/resource";
import { createGearFromNode, createPotentialFromNode } from "..";

test("create all gears in resource", () => {
  function getItemOptionNode(code: number): IItemOption {
    return itemOptionJson[code];
  }

  for (const [id, node] of Object.entries(gearJson)) {
    expect(
      createGearFromNode(node, Number(id), getItemOptionNode)
    ).not.toBeUndefined();
  }
});

test("create all potentials in resource", () => {
  for (const [code, node] of Object.entries(itemOptionJson)) {
    const pot = createPotentialFromNode(node, Number(code), 1);
    expect(pot).not.toBeUndefined();
    expect(pot.convertSummary).not.toContain("#");
  }
});
