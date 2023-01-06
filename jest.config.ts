import type { Config } from '@jest/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'comment-json';

const data = readFileSync(join(__dirname, 'tsconfig.json'), { encoding: 'utf-8' });
const { compilerOptions } = parse(data) as unknown as {
  compilerOptions: {
    baseUrl: string,
    paths: Record<string, string[] | string>
  },
};
const { baseUrl, paths } = compilerOptions;


export default async (): Promise<Config.InitialOptions> => {

  return {
    rootDir: baseUrl,
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    testRegex: ".*\\.spec\\.ts$",
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    coverageDirectory: "./coverage",
    testEnvironment: "node",
    moduleNameMapper: Object.entries(paths).reduce((acc, [alias, p]) => {
      (acc as any)[alias] = Array.isArray(p)
        ? p.map((_p) => `<rootDir>/${_p}`)
        : `<rootDir>/${p}`;

      return acc;
    }, {} as Record<string, string>),
    verbose: true,
    detectOpenHandles: true,
    detectLeaks: true,
    projects: [
      '<rootDir>/apps/chatik/test/jest.config.ts',
      '<rootDir>/apps/chatik-ws/test/jest.config.ts',
      '<rootDir>/libs/config/test/jest.config.ts',
    ],
  };
}
