import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    // Resuelve el alias @/ que usas en los imports
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // Le dice a ts-jest que use tu tsconfig
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.json',
            },
        ],
    },

    // Donde están tus tests
    testMatch: ['**/__test__/**/*.test.ts', '**/__tests__/**/*.test.ts'],

    // Separación unit / integration (opcional pero recomendado)
    projects: [
        {
            displayName: 'unit',
            preset: 'ts-jest',
            testEnvironment: 'node',
            testMatch: [
                '<rootDir>/src/**/domain/**/*.test.ts',
                '<rootDir>/src/**/application/**/*.test.ts',
            ],
            moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
            transform: {
                '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }],
            },
        },
        {
            displayName: 'integration',
            preset: 'ts-jest',
            testEnvironment: 'node',
            testMatch: ['<rootDir>/src/**/infrastructure/**/*.test.ts'],
            moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
            transform: {
                '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }],
            },
        },
    ],
}

export default config
