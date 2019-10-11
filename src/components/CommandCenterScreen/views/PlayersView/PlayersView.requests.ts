import { gql } from 'apollo-boost';

export const GET_PLAYERS = gql`
  query GET_PLAYERS {
    gameState @client {
      boardState {
        players {
          id
          name
          cards {
            id
            name
            type
            location {
              color
            }
          }
        }
      }
    }
  }
`;
