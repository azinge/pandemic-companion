import { gql } from 'apollo-boost';

const LocationFragments = {
  default: gql`
    fragment DefaultLocation on Location {
      id
      persistanceLevel
      name
      position {
        x
        y
      }
      color
      resourcePiles {
        id
        resource {
          name
        }
        count
      }
      tags {
        id
        name
        description
      }
      tags
    }
  `,
};

export const GET_MAP_STATE_INFO = gql`
  query GET_MAP_STATE_INFO {
    gameState @client(always: true) {
      mapState {
        locations {
          ...DefaultLocation
        }
        routes {
          id
          start {
            ...DefaultLocation
          }
          end {
            ...DefaultLocation
          }
          resourcePiles {
            id
            resource {
              name
            }
            count
          }
          tags {
            id
            name
            description
          }
          isWrapping
        }
      }
    }
  }
  ${LocationFragments.default}
`;
