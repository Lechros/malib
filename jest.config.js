/** @type {import('jest').Config} */
const config = {
  projects: [
    {
      displayName: 'gear',
      rootDir: 'packages/gear',
      roots: ['src'],
    },
  ],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;
