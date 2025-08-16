import type { Config } from "jest";

const config: Config = {
  rootDir: "./",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
  "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__tests__/__mocks__/fileMock.js",
  "^@components/(.*)$": "<rootDir>/src/components/$1",
  "^@data/(.*)$": "<rootDir>/src/data/$1",
  "^@appTypes/(.*)$": "<rootDir>/src/types/$1",
  "^@utils/(.*)$": "<rootDir>/src/utils/$1"
},
testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/__tests__/__mocks/",
    "<rootDir>/src/__tests__/jest.setup.ts"
  ],
};

export default config;
