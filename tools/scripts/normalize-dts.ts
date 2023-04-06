import { existsSync, readdirSync, renameSync, rmSync } from "fs";
import { join, resolve } from "path";

interface Options {
  /**
   * Package root (`__dirname`)
   */
  root: string;
  /**
   * Package name
   */
  name: string;
}

function normalizeDts(options: Options): () => void {
  const { root, name } = options;
  return () => {
    const distRoot = resolve(root, "../../dist");
    const dist = join(distRoot, "packages", name);
    if (existsSync(join(dist, name))) {
      // move all files to dist
      const files = readdirSync(join(dist, name, "src"));
      for (const file of files) {
        renameSync(join(dist, name, "src", file), join(dist, file));
      }
      // remove empty dir
      rmSync(join(dist, name), { recursive: true });
    }
    if (existsSync(join(dist, "malib", "packages", name))) {
      // move all files to dist
      const files = readdirSync(join(dist, "malib", "packages", name, "src"));
      for (const file of files) {
        renameSync(
          join(dist, "malib", "packages", name, "src", file),
          join(dist, file)
        );
      }
      // remove empty dir
      rmSync(join(dist, "malib"), { recursive: true });
    }
  };
}

export default normalizeDts;
