module.exports = {
  client: {
    name: 'pandemic-companion',
    service: {
      endpoint: null,
    },
    tagName: 'graphql',
    includes: ['src/**/*.{ts,tsx}'],
    excludes: ['src/graphql/schema.graphql'],
  },
};
