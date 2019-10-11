import { gql } from 'apollo-boost';

export const GET_NOTES = gql`
  query GET_NOTES {
    gameState @client {
      boardState {
        notes {
          description
        }
      }
    }
  }
`;
