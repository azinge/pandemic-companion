import { gql } from 'apollo-boost';

export const GET_GENERAL_INFO = gql`
  query GET_GENERAL_INFO {
    gameState @client {
      boardState {
        resourceStockpiles {
          id
          resource {
            name
          }
          count
        }
        tags {
          id
          name
          description
        }
      }
    }
  }
`;
