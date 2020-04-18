import { gql } from 'apollo-boost';

const PlayerCardFragments = {
  default: gql`
    fragment DefaultPlayerCard on PlayerCard {
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
  `,
};

export const GET_PLAYER_CARDS_INFO = gql`
  query GET_PLAYER_CARDS_INFO {
    gameState @client(always: true) {
      playerCards {
        ...DefaultPlayerCard
      }
    }
  }
  ${PlayerCardFragments.default}
`;
