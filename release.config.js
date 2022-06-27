const defaultRules = require('@semantic-release/commit-analyzer/lib/default-release-rules.js')

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          ...defaultRules,
          // Use the default rules, and fall back to patching everything
          { release: 'patch' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
}
