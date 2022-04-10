/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>setup-tests.js"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8"
};
