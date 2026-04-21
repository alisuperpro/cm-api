import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'

const config: Config = {
    projects: [
        {
            displayName: 'unit',
            preset: 'ts-jest',
            testEnvironment: 'node',
            testMatch: [
                '<rootDir>/src/**/domain/__test__/**/*.test.ts',
                '<rootDir>/src/**/application/__test__/**/*.test.ts',
            ],
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1', // manual, sin pathsToModuleNameMapper
            },
            transform: {
                '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
            },
        },
        {
            displayName: 'integration',
            preset: 'ts-jest',
            testEnvironment: 'node',
            testMatch: [
                '<rootDir>/src/**/infrastructure/__test__/**/*.test.ts',
            ],
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1',
            },
            transform: {
                '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
            },
        },
    ],
}

export default config
