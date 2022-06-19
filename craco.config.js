const { getLoader, loaderByName, addBeforeLoaders } = require('@craco/craco')

module.exports = ({ env }) => {
  return {
    webpack: {
      configure: config => {
        // add loader for graphql
        addBeforeLoaders(config, loaderByName('file-loader'), {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        })

        // make sure that file loader doesn't try to load graphql on its own
        const { isFound, match } = getLoader(config, loaderByName('file-loader'))
        if (isFound) {
          match.loader.exclude = [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.(graphql|gql)$/]
        }
        return config
      },
    },
    jest: {
      configure: jestConfig => {
        return {
          ...jestConfig,
          transform: {
            '\\.(gql|graphql)$': 'jest-transform-graphql',
            ...jestConfig.transform,
          },
          cacheDirectory: './.cache/jest',
          clearMocks: true,
          resetMocks: false,
          moduleDirectories: ['src', 'node_modules'],
          testResultsProcessor: 'jest-sonar-reporter',
          collectCoverage: true,
          coverageReporters: ['lcov'],
          collectCoverageFrom: [
            '**/*.js',
            '**/*.jsx',
            '**/*.ts',
            '**/*.tsx',
            '!**/*.d.ts',
            '!**/*.spec.js*',
            '!**/*.spec.ts*',
            '!**/*.test.ts*',
            '!**/*.test.js*',
            '!**/__mocks__/**',
            '!src/apollo/generated.ts',
            '!src/apollo/helpers.ts',
            '!**/*.graphql.d.ts'
          ],
        }
      },
    },
  }
}
