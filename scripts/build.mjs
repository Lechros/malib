import crypto from 'crypto';
import esbuild from 'esbuild';
import { cpSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

const PACKAGES_DIR = 'packages';

const esbuildCommonOptions = {
  bundle: true,
  minify: true,
};

let errCnt = 0;
// Process each package
const tasks = readdirSync(PACKAGES_DIR).map((pkg) => {
  const pkgdir = join(PACKAGES_DIR, pkg);
  const main = join(pkgdir, 'src/index.ts');
  const tsconfig = join(pkgdir, 'tsconfig.lib.json');

  const { config, error } = ts.readConfigFile(tsconfig, ts.sys.readFile);
  if (error) {
    throw [error];
  }
  const cfg = ts.parseJsonConfigFileContent(config, ts.sys, pkgdir);

  const outdir = cfg.options.outDir;

  const esbuildOptions = {
    ...esbuildCommonOptions,
    entryPoints: [main],
    tsconfig,
    outdir,
  };
  const buildDts = (async () => {
    // Emit dts files only
    cfg.options.emitDeclarationOnly = true;

    const program = ts.createProgram(cfg.fileNames, cfg.options);
    const result = program.emit();

    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .concat(result.diagnostics);
    if (diagnostics.length > 0) {
      throw diagnostics;
    }
  })();
  const buildEsm = esbuild.build({
    ...esbuildOptions,
    format: 'esm',
  });
  const buildCjs = esbuild.build({
    ...esbuildOptions,
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  });

  return Promise.all([buildEsm, buildCjs, buildDts])
    .then(() => {
      console.log(`Build package '${pkg}' OK: ${outdir}`);
    })
    .catch((errors) => {
      // Clear build output on error
      rmSync(outdir, { recursive: true, force: true });
      console.error(`\x1b[31mBuild package '${pkg}' FAIL.\x1b[0m`);
      console.error(
        ts.formatDiagnosticsWithColorAndContext(errors, {
          getCurrentDirectory: ts.sys.getCurrentDirectory,
          getCanonicalFileName: (filename) => filename,
          getNewLine: () => ts.sys.newLine,
        }),
      );
      errCnt++;
    });
});
await Promise.allSettled(tasks);
process.exit(errCnt);
