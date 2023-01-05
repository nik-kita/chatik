import type { Config } from '@jest/types';


export default async (): Promise<Config.InitialOptions> => {

  return {
    rootDir: '..',
    preset: 'ts-jest',
    displayName: 'apps/chatik',
    globalSetup: '<rootDir>/test/jest.global-setup.ts',
  };
}
