import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import { Config } from 'jest';

const config: Config = {
  bail: true,
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"]
};

export default config
