import ApolloClient from 'apollo-boost';
import { resolvers } from './resolvers';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  resolvers: resolvers,
});
client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
};

export default client;
