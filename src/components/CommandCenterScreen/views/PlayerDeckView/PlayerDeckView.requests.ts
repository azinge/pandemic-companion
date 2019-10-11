import { gql } from 'apollo-boost';

export const GET_PLAYER_DECK = gql`
  query GET_PLAYER_DECK {
    gameState @client(always: true) {
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
        playerDeck {
          drawPile {
            id
            name
            type
            location {
              color
            }
          }
          drawPileSizes
          discardPile {
            id
            name
            type
            location {
              color
            }
          }
          outOfGamePile {
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

export const SAVE_PLAYER_DECK = gql`
  mutation SAVE_PLAYER_DECK(
    $srcDropId: String
    $srcIndex: Int
    $dstDropId: String
    $dstIndex: Int
  ) {
    savePlayerDeck(
      srcDropId: $srcDropId
      srcIndex: $srcIndex
      dstDropId: $dstDropId
      dstIndex: $dstIndex
    ) @client {
      boardState {
        playerDeck {
          drawPile {
            id
            name
            type
            location {
              color
            }
          }
          drawPileSizes
          discardPile {
            id
            name
            type
            location {
              color
            }
          }
          outOfGamePile {
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
