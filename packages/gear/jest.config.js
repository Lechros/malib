/** @type {import('jest').Config} */
const config = {
  displayName: 'gear',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  preset: 'ts-jest',
  roots: ['src'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default config;
