import { gql } from 'apollo-boost';

const InfectionCardFragments = {
  default: gql`
    fragment DefaultInfectionCard on InfectionCard {
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

export const GET_INFECTION_CARDS_INFO = gql`
  query GET_INFECTION_CARDS_INFO {
    gameState @client(always: true) {
      infectionCards {
        ...DefaultInfectionCard
      }
    }
  }
  ${InfectionCardFragments.default}
`;
