import ApolloClient from 'apollo-boost';
import { typeDefs } from './schema';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  typeDefs,
});

client.cache.writeData({
  data: {
    someField: 'some value',
  },
});

// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `,
//   })
//   .then(result => console.log(result));

export default client;
