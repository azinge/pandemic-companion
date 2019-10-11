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
