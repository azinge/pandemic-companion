import { gql } from 'apollo-boost';

export const GET_MAP_STATE = gql`
  query GET_MAP_STATE {
    gameState @client {
      mapState {
        locations {
          id
          name
          position {
            x
            y
          }
          color
        }
        routes {
          id
          start {
            id
            name
          }
          end {
            id
            name
          }
          isWrapping
        }
      }
    }
  }
`;

export const UPDATE_LOCATION_POSITION = gql`
  mutation UPDATE_LOCATION_POSITION($id: ID, $x: Float, $y: Float) {
    updateLocationPosition(id: $id, x: $x, y: $y) @client
  }
`;
