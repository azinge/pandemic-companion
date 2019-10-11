import { gql } from 'apollo-boost';

export const GET_OBJECTIVES = gql`
  query GET_OBJECTIVES {
    gameState @client {
      boardState {
        objectives {
          id
          description
          isMandatory
          isComplete
        }
      }
    }
  }
`;
