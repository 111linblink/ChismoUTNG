module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@ngrx|@ionic|rxjs|zone\\.js|.*\\.mjs$))',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(html)$': '<rootDir>/src/__mocks__/htmlMock.js',
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  testMatch: ['**/*.spec.ts'],

  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/test.ts'
  ]
};
