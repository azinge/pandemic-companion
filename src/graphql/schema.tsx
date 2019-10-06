import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Launch]!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }

  enum PersistanceLevel {
    ALWAYS
    CAMPAIGN
    GAME
    NEVER
  }

  interface Persistable {
    id: ID
    persistanceLevel: PersistanceLevel
  }

  interface BoardState {
    objectives: [Objective]
    notes: [Note]
    resources: [Resource]
    tags: [Tag]
    infectionRate: Int
  }

  type Objective implements Persistable {
    description: String
    isMandatory: Boolean
    isComplete: Boolean
  }

  type Note implements Persistable {
    description: String
  }

  enum LocationColor {
    BLUE
    YELLOW
    BLACK
    RED
    MISC
  }

  type Location implements Persistable {
    name: String
    position: Position
    color: LocationColor
    routes: [Route]
    resourcePiles: [ResourcePile]
    tags: [Tag]
  }

  type Route implements Persistable {
    start: Location
    end: Location
    resourcePiles: [ResourcePile]
    tags: [Tag]
  }

  type Player implements Persistable {
    name: String
    location: Location
    traits: [Trait]
    cards: [PlayerCard]
    resourcePiles: [ResourcePile]
    tags: [Tag]
  }

  type PlayerDeck {
    stacks: [PlayerDeckStack]
    discardPile: [Card]
  }

  type PlayerDeckStack {
    shuffledCards: [Card]
  }

  enum PlayerCardType {
    LOCATION
    EVENT
    EPIDEMIC
    MISC
  }

  type PlayerCard implements Persistable {
    name: String
    description: String
    location: Location
    type: PlayerCardType
    traits: [Trait]
    tags: [Tag]
  }

  type InfectionDeck {
    stacks: [InfectionDeckStack]
    discardPile: [Card]
  }

  type InfectionDeckStack {
    shuffledCards: [Card]
  }

  enum InfectionCardType {
    LOCATION
    EVENT
    EPIDEMIC
    MISC
  }

  type InfectionCard implements Persistable {
    name: String
    description: String
    location: Location
    type: InfectionCardType
    traits: [Trait]
    tags: [Tag]
  }

  enum TraitType {
    PLAYER
    PLAYER_CARD
    INFECTION_CARD
    MISC
  }

  type Trait {
    name: String
    description: String
    type: TraitType
  }

  type Collection implements Persistable {
    name: String
    condition: Condition
    description: String
    tags: [Tag]
  }

  type ResourcePile implements Persistable {
    resource: Resource
    count: Int
    tags: [Tag]
  }

  type Resource implements Persistable {
    stockCount: Int
  }

  type Tag implements Persistable {
    name: String
    description: String
    condition: Condition
  }

  type Condition {
    query: String
  }
`;
