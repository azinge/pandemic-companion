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

export const CREATE_INFECTION_DECK_STACK = gql`
  mutation CREATE_INFECTION_DECK_STACK {
    createInfectionDeckStack @client
  }
`;

export const DELETE_INFECTION_DECK_STACK = gql`
  mutation DELETE_INFECTION_DECK_STACK($index: Int) {
    deleteInfectionDeckStack(index: $index) @client
  }
`;
