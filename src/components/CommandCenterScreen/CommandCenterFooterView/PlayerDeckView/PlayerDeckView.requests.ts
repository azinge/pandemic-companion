import { gql } from 'apollo-boost';

export const GET_PLAYER_DECK = gql`
  query GET_PLAYER_DECK {
    gameState {
      boardState {
        playerDeck {
          drawPile {
            name
            type
          }
          drawPileSizes
        }
      }
    }
  }
`;
