import { gql } from 'apollo-boost';

const PlayerFragments = {
  default: gql`
    fragment DefaultPlayer on Player {
      id
      persistanceLevel
      name
      location {
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
      }
      traits {
        name
        description
        type
      }
      cards {
        id
        persistanceLevel
        name
        description
        location {
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
        }
        type
        traits {
          name
          description
          type
        }
        tags {
          id
          name
          description
        }
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
    }
  `,
};

export const GET_PLAYERS_INFO = gql`
  query GET_PLAYERS_INFO {
    gameState @client(always: true) {
      players {
        ...DefaultPlayer
      }
      boardState {
        players {
          ...DefaultPlayer
        }
      }
    }
  }
  ${PlayerFragments.default}
`;
