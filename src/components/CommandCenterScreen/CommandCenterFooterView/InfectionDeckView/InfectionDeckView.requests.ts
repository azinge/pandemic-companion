import { gql } from 'apollo-boost';

export const GET_INFECTION_DECK = gql`
  query GET_INFECTION_DECK {
    gameState {
      boardState {
        infectionDeck {
          drawPileStacks {
            shuffledCards {
              name
            }
          }
        }
      }
    }
  }
`;
