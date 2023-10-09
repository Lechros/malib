import { createSoulFromId, soulData } from "../..";

test("create all souls in resource", () => {
  for (const id of Object.keys(soulData)) {
    const soul = createSoulFromId(Number(id));
    expect(soul).not.toBeUndefined();
  }
});
