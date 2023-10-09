import { createPotentialFromNode, itemOptionData } from "../..";

test("create all potentials in resource", () => {
  for (const [code, node] of Object.entries(itemOptionData)) {
    const pot = createPotentialFromNode(node, Number(code), 1);
    expect(pot).not.toBeUndefined();
    expect(pot.convertSummary).not.toContain("#");
  }
});
