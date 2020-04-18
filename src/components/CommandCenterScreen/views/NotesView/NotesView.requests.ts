import { gql } from 'apollo-boost';

export const GET_NOTES = gql`
  query GET_NOTES {
    gameState @client {
      boardState {
        notes {
          id
          description
        }
      }
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CREATE_NOTE {
    createNote @client
  }
`;

export const UPDATE_NOTE = gql`
  mutation UPDATE_NOTE($id: ID, $data: Note) {
    updateNote(id: $id, data: $data) @client
  }
`;

export const DELETE_NOTE = gql`
  mutation DELETE_NOTE($id: ID) {
    deleteNote(id: $id) @client
  }
`;
