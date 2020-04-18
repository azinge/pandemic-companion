export interface GQLType {
  __typename?: string;
}

export enum PersistanceLevel {
  ALWAYS,
  GAME,
  NEVER,
}

export interface Persistable {
  id?: string;
  persistanceLevel?: PersistanceLevel;
}

export interface GameState extends GQLType {
  boardState?: BoardState;
  mapState?: MapState;
  players?: Player[];
  playerCards?: PlayerCard[];
  infectionCards?: InfectionCard[];
  resources?: Resource[];
  actions?: Trait[];
}

export interface MapState extends GQLType {
  locations?: Location[];
  routes?: Route[];
}

export interface BoardState extends GQLType {
  objectives?: Objective[];
  notes?: Note[];
  tags?: Tag[];
  infectionRate?: number;
  players?: Player[];
  resourceStockpiles?: ResourcePile[];
  infectionDeck?: InfectionDeck;
  playerDeck?: PlayerDeck;
}

export interface Objective extends Persistable, GQLType {
  description?: string;
  isMandatory?: Boolean;
  isComplete?: Boolean;
}

export interface Note extends Persistable, GQLType {
  description?: string;
}

export enum LocationColor {
  BLUE,
  YELLOW,
  BLACK,
  RED,
  MISC,
}

export interface Location extends Persistable, GQLType {
  name?: string;
  position?: Position;
  color?: LocationColor;
  resourcePiles?: ResourcePile[];
  tags?: Tag[];
}

export interface Position extends GQLType {
  x?: number;
  y?: number;
}

export interface Route extends Persistable, GQLType {
  start?: Location;
  end?: Location;
  resourcePiles?: ResourcePile[];
  tags?: Tag[];
  isWrapping?: boolean;
}

export interface Player extends Persistable, GQLType {
  name?: string;
  location?: Location;
  traits?: Trait[];
  cards?: PlayerCard[];
  resourcePiles?: ResourcePile[];
  tags?: Tag[];
}

export interface PlayerDeck extends GQLType {
  drawPile?: PlayerCard[];
  drawPileSizes?: number[];
  discardPile?: PlayerCard[];
  outOfGamePile?: PlayerCard[];
  tags?: Tag[];
}

export enum PlayerCardType {
  LOCATION,
  EVENT,
  EPIDEMIC,
  MISC,
}

export interface PlayerCard extends Persistable, GQLType {
  name?: string;
  description?: string;
  location?: Location;
  type?: PlayerCardType;
  traits?: Trait[];
  tags?: Tag[];
}

export interface InfectionDeck extends GQLType {
  drawPileStacks?: InfectionDeckStack[];
  discardPile?: InfectionCard[];
  outOfGamePile?: InfectionCard[];
  tags?: Tag[];
}

export interface InfectionDeckStack extends GQLType {
  shuffledCards?: InfectionCard[];
}

export enum InfectionCardType {
  LOCATION,
  MISC,
}

export interface InfectionCard extends Persistable, GQLType {
  name?: string;
  description?: string;
  location?: Location;
  type?: InfectionCardType;
  traits?: Trait[];
  tags?: Tag[];
}

export enum TraitType {
  PLAYER,
  PLAYER_CARD,
  INFECTION_CARD,
  MISC,
}

export interface Trait extends Persistable, GQLType {
  name?: string;
  description?: string;
  type?: TraitType;
}

export interface ResourcePile extends Persistable, GQLType {
  resource?: Resource;
  count?: number;
  tags?: Tag[];
}

export interface Resource extends Persistable, GQLType {
  name?: string;
  stockCount?: number;
}

export interface Tag extends Persistable, GQLType {
  name?: string;
  description?: string;
}
