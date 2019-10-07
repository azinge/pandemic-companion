import { gql } from 'apollo-boost';

export const GET_PLAYERS = gql`
  query GET_PLAYERS {
    gameState {
      boardState {
        players {
          name
          cards
        }
      }
    }
  }
`;
