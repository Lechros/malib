import { SoulRepository } from "../..";
import soulJson from "./res/soul.json";

const soulRepository = new SoulRepository(soulJson);

test("create all souls in resource", () => {
  for (const id of soulRepository.ids()) {
    const soul = soulRepository.createSoulFromId(id);
    expect(soul).not.toBeUndefined();
  }
});
