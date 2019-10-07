import { gql } from 'apollo-boost';

export const GET_GENERAL_INFO = gql`
  query GET_GENERAL_INFO {
    gameState {
      boardState {
        resourceStockpiles {
          resource {
            name
          }
          count
        }
        tags {
          name
          description
        }
      }
    }
  }
`;
