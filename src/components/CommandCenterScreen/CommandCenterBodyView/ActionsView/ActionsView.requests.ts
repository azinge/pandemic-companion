import { gql } from 'apollo-boost';

export const GET_GENERAL_ACTIONS = gql`
  query GET_GENERAL_ACTIONS {
    gameState {
      actions {
        name
        description
      }
    }
  }
`;
