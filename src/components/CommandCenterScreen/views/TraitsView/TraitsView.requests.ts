import { gql } from 'apollo-boost';

export const GET_GENERAL_ACTIONS = gql`
  query GET_GENERAL_ACTIONS {
    gameState @client {
      actions {
        name
        description
      }
      boardState {
        players {
          traits {
            description
          }
        }
      }
    }
  }
`;

export const CREATE_GLOBAL_ACTION = gql`
  mutation CREATE_GLOBAL_ACTION {
    createGlobalAction @client
  }
`;

export const UPDATE_GLOBAL_ACTION = gql`
  mutation UPDATE_GLOBAL_ACTION($id: ID, $data: Action) {
    updateGlobalAction(id: $id, data: $data) @client
  }
`;

export const DELETE_GLOBAL_ACTION = gql`
  mutation DELETE_GLOBAL_ACTION($id: ID) {
    deleteGlobalAction(id: $id) @client
  }
`;
