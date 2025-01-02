import crypto from 'crypto';
import esbuild from 'esbuild';
import { cpSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

const PACKAGES_DIR = 'packages';
const OUT_ROOT = 'dist';
const TEMP_DIR = 'temp-' + crypto.randomUUID();

const esbuildCommonOptions = {
  bundle: true,
  minify: true,
};

// Clear output directory
rmSync(OUT_ROOT, { recursive: true, force: true });
let errCnt = 0;
// Process each package
const tasks = readdirSync(PACKAGES_DIR).map((pkg) => {
  const pkgdir = join(PACKAGES_DIR, pkg);
  const main = join(pkgdir, 'src/index.ts');
  const tsconfig = join(pkgdir, 'tsconfig.lib.json');
  const dtsOutDir = join(pkgdir, TEMP_DIR);
  const outdir = join(OUT_ROOT, pkg);
  const esbuildOptions = {
    ...esbuildCommonOptions,
    entryPoints: [main],
    tsconfig,
    outdir: outdir,
  };
  const buildEsm = esbuild.build({
    ...esbuildOptions,
    format: 'esm',
  });
  const buildCjs = esbuild.build({
    ...esbuildOptions,
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  });
  const buildDts = (async () => {
    const { config, error } = ts.readConfigFile(tsconfig, ts.sys.readFile);
    if (error) {
      throw [error];
    }
    const cfg = ts.parseJsonConfigFileContent(config, ts.sys, pkgdir);
    // Emit dts files only
    cfg.options.emitDeclarationOnly = true;
    cfg.options.outDir = dtsOutDir;

    const program = ts.createProgram(cfg.fileNames, cfg.options);
    const result = program.emit();

    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .concat(result.diagnostics);
    if (diagnostics.length > 0) {
      throw diagnostics;
    }
  })();

  return Promise.all([buildEsm, buildCjs, buildDts])
    .then(() => {
      // Move dts files into dist directory
      cpSync(dtsOutDir, outdir, { recursive: true });
      // Copy package.json
      cpSync(join(pkgdir, 'package.json'), join(outdir, 'package.json'));
      console.log(`Build package '${pkg}' OK: ${pkgdir}`);
    })
    .catch((errors) => {
      // Clear build output on error
      rmSync(outdir, { recursive: true, force: true });
      console.error(`\x1b[31mBuild package '${pkg}' FAIL.\x1b[0m`);
      console.error(
        ts.formatDiagnosticsWithColorAndContext(
          errors.filter((err) => err instanceof ts.Diagnostic),
          {
            getCurrentDirectory: ts.sys.getCurrentDirectory,
            getCanonicalFileName: (filename) => filename,
            getNewLine: () => ts.sys.newLine,
          },
        ),
      );
      errCnt++;
    })
    .finally(() => {
      // Delete temp dts directory
      rmSync(dtsOutDir, { recursive: true });
    });
});
await Promise.allSettled(tasks);
process.exit(errCnt);
