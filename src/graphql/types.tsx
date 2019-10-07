export enum PersistanceLevel {
  ALWAYS,
  CAMPAIGN,
  GAME,
  NEVER,
}

export interface Persistable {
  id?: string;
  persistanceLevel?: PersistanceLevel;
}

export interface BoardState {
  objectives?: [Objective];
  notes?: [Note];
  resources?: [Resource];
  tags?: [Tag];
  infectionRate?: number;
  actions?: [Trait];
}

export interface Objective extends Persistable {
  description?: string;
  isMandatory?: Boolean;
  isComplete?: Boolean;
}

export interface Note extends Persistable {
  description?: string;
}

export enum LocationColor {
  BLUE,
  YELLOW,
  BLACK,
  RED,
  MISC,
}

export interface Location extends Persistable {
  name?: string;
  position?: Position;
  color?: LocationColor;
  routes?: [Route];
  resourcePiles?: [ResourcePile];
  tags?: [Tag];
}

export interface Route extends Persistable {
  start?: Location;
  end?: Location;
  resourcePiles?: [ResourcePile];
  tags?: [Tag];
}

export interface Player extends Persistable {
  name?: string;
  location?: Location;
  traits?: [Trait];
  cards?: [PlayerCard];
  resourcePiles?: [ResourcePile];
  tags?: [Tag];
}

export interface PlayerDeck {
  stacks?: [PlayerDeckStack];
  discardPile?: [PlayerCard];
}

export interface PlayerDeckStack {
  shuffledCards?: [PlayerCard];
}

export enum PlayerCardType {
  LOCATION,
  EVENT,
  EPIDEMIC,
  MISC,
}

export interface PlayerCard extends Persistable {
  name?: string;
  description?: string;
  location?: Location;
  type?: PlayerCardType;
  traits?: [Trait];
  tags?: [Tag];
}

export interface InfectionDeck {
  stacks?: [InfectionDeckStack];
  discardPile?: [InfectionCard];
}

export interface InfectionDeckStack {
  shuffledCards?: [InfectionCard];
}

export enum InfectionCardType {
  LOCATION,
  EVENT,
  EPIDEMIC,
  MISC,
}

export interface InfectionCard extends Persistable {
  name?: string;
  description?: string;
  location?: Location;
  type?: InfectionCardType;
  traits?: [Trait];
  tags?: [Tag];
}

export enum TraitType {
  PLAYER,
  PLAYER_CARD,
  INFECTION_CARD,
  MISC,
}

export interface Trait {
  name?: string;
  description?: string;
  type?: TraitType;
}

export interface Collection extends Persistable {
  name?: string;
  condition?: Condition;
  description?: string;
  tags?: [Tag];
}

export interface ResourcePile extends Persistable {
  resource?: Resource;
  count?: number;
  tags?: [Tag];
}

export interface Resource extends Persistable {
  name?: string;
  stockCount?: number;
}

export interface Tag extends Persistable {
  name?: string;
  description?: string;
  condition?: Condition;
}

export interface Condition {
  query?: string;
}
