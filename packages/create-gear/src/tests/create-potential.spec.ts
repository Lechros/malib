import { createPotentialFromNode } from "../lib/create-potential";
import { itemOptionJson } from "../lib/resource";

test("create all potentials in resource", () => {
  for (const [code, node] of Object.entries(itemOptionJson)) {
    const pot = createPotentialFromNode(node, Number(code), 1);
    expect(pot).not.toBeUndefined();
    expect(pot.convertSummary).not.toContain("#");
  }
});
