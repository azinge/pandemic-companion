import { gql } from 'apollo-boost';

export const GET_UNIQUE_TRAITS = gql`
  query GET_UNIQUE_TRAITS {
    gameState {
      boardState {
        players {
          traits {
            description
          }
        }
      }
    }
  }
`;
