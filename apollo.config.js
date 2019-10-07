module.exports = {
  client: {
    name: 'pandemic-companion',
    service: 'client-api',
    tagName: 'graphql',
    includes: ['src/**/*.{ts,tsx}'],
    excludes: ['src/graphql/schema.graphql'],
  },
};
