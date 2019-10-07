module.exports = {
  client: {
    name: 'pandemic-companion',
    service: {
      endpoint: null,
      localSchemaFile: './src/graphql/schema.graphql',
    },
    tagName: 'graphql',
    includes: ['src/**/*.{ts,tsx}'],
    excludes: ['src/graphql/schema.graphql'],
  },
};
