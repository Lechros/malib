import { readdirSync } from 'fs';

/** @type {import('jest').Config} */
const config = {
  projects: [
    ...readdirSync('packages').map((name) => ({
      displayName: name,
      roots: [`packages/${name}/src`],
      testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
      ],
      transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
      },
    })),
  ],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['text'],
};

export default config;
