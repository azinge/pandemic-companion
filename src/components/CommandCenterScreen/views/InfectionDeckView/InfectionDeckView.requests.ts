import { gql } from 'apollo-boost';

export const GET_INFECTION_DECK = gql`
  query GET_INFECTION_DECK {
    gameState @client(always: true) {
      boardState {
        infectionDeck {
          drawPileStacks {
            shuffledCards {
              id
              name
              location {
                color
              }
            }
          }
          discardPile {
            id
            name
            location {
              color
            }
          }
          outOfGamePile {
            id
            name
            location {
              color
            }
          }
        }
      }
    }
  }
`;

export const SAVE_INFECTION_DECK = gql`
  mutation SAVE_INFECTION_DECK(
    $srcDropId: String
    $srcIndex: Int
    $dstDropId: String
    $dstIndex: Int
  ) {
    saveInfectionDeck(
      srcDropId: $srcDropId
      srcIndex: $srcIndex
      dstDropId: $dstDropId
      dstIndex: $dstIndex
    ) @client {
      boardState {
        infectionDeck {
          drawPileStacks {
            shuffledCards {
              id
              name
              location {
                color
              }
            }
          }
          discardPile {
            id
            name
            location {
              color
            }
          }
          outOfGamePile {
            id
            name
            location {
              color
            }
          }
        }
      }
    }
  }
`;
