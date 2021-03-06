/**  @type {import('@jest/types').Config.ProjectConfig} */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    testEnvironment: "jsdom",
    transform: {
        "\\.tsx?$": "ts-jest",
        "\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "(.+)\\.js": "$1"
    },
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8"
};
