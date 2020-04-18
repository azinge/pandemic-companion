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

export const CREATE_OBJECTIVE = gql`
  mutation CREATE_OBJECTIVE {
    createObjective @client
  }
`;

export const UPDATE_OBJECTIVE = gql`
  mutation UPDATE_OBJECTIVE($id: ID, $data: Objective) {
    updateObjective(id: $id, data: $data) @client
  }
`;

export const DELETE_OBJECTIVE = gql`
  mutation DELETE_OBJECTIVE($id: ID) {
    deleteObjective(id: $id) @client
  }
`;
