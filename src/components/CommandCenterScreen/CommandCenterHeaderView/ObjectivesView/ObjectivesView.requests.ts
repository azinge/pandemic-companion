import { gql } from 'apollo-boost';

export const GET_OBJECTIVES = gql`
  query GET_OBJECTIVES {
    gameState {
      boardState {
        objectives {
          description
          isMandatory
          isComplete
        }
      }
    }
  }
`;
