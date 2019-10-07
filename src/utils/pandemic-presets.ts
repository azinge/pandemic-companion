import {
  BoardState,
  MapState,
  Player,
  PlayerCard,
  InfectionCard,
  Resource,
  Trait,
  GameState,
  TraitType,
  PersistanceLevel,
  Location,
  LocationColor,
  PlayerCardType,
  InfectionCardType,
} from '../graphql/types';

type LocationDictionary = { [key: string]: Location };
type ResourceDictionary = { [key: string]: Resource };

export const createEmptyMapState = () => {
  const mapState: MapState = {
    __typename: 'MapState',
    locations: [],
    routes: [],
  };
  return mapState;
};

export const createEmptyBoardState = () => {
  const boardState: BoardState = {
    __typename: 'BoardState',
    objectives: [],
    notes: [],
    players: [],
    resourceStockpiles: [],
    infectionDeck: {
      __typename: 'InfectionDeck',
      drawPileStacks: [],
      discardPile: [],
      outOfGamePile: [],
      tags: [],
    },
    playerDeck: {
      __typename: 'PlayerDeck',
      drawPile: [],
      drawPileSizes: [],
      discardPile: [],
      outOfGamePile: [],
      tags: [],
    },
    infectionRate: 0,
  };
  return boardState;
};

export const createEmptyGameState = () => {
  const players: Player[] = [];
  const playerCards: PlayerCard[] = [];
  const infectionCards: InfectionCard[] = [];
  const resources: Resource[] = [];
  const actions: Trait[] = [];
  const mapState = createEmptyMapState();
  const boardState = createEmptyBoardState();

  const gameState: GameState = {
    __typename: 'GameState',
    players,
    playerCards,
    infectionCards,
    resources,
    actions,
    mapState,
    boardState,
  };
  return gameState;
};

export const createPandemicBasePlayerDictionary = () => {
  let id = 1;
  const basePlayer = () => {
    return {
      __typename: 'Player',
      id: `player-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
      cards: [],
      resourcePiles: [],
      tags: [],
    };
  };
  const baseTrait = () => ({
    __typename: 'Trait',
    name: '',
    type: TraitType.PLAYER,
  });
  const Scientist: Player = {
    ...basePlayer(),
    name: 'Scientist',
    traits: [
      {
        ...baseTrait(),
        description:
          'You need only 4 cards of the same color to do the Discover a Cure action.',
      },
    ],
  };
  const Researcher: Player = {
    ...basePlayer(),
    name: 'Researcher',
    traits: [
      {
        ...baseTrait(),
        description:
          'As an action, you may give (or a player can take) any City card from your hand. ' +
          'You must both be in the same city. The card does not have to match the city you are in.',
      },
    ],
  };
  const Medic: Player = {
    ...basePlayer(),
    name: 'Medic',
    traits: [
      {
        ...baseTrait(),
        description: 'Remove all cubes of one color when doing Treat Disease.',
      },
      {
        ...baseTrait(),
        description:
          'Automatically remove cubes of cured diseases from the city you are in (and prevent them from being placed there).',
      },
    ],
  };
  const Dispatcher: Player = {
    ...basePlayer(),
    name: 'Dispatcher',
    traits: [
      {
        ...baseTrait(),
        description: "Move another player's pawn as if it were yours.",
      },
      {
        ...baseTrait(),
        description:
          'As an action, move any pawn to another city with another pawn.',
      },
    ],
  };
  const Operations_Expert: Player = {
    ...basePlayer(),
    name: 'Operations Expert',
    traits: [
      {
        ...baseTrait(),
        description:
          'As an action, build a research station in the city you are in (no discard needed).',
      },
      {
        ...baseTrait(),
        description:
          'Once per turn as an action, move from a research station to any other city by discarding any City card.',
      },
    ],
  };
  const Quarantine_Specialist: Player = {
    ...basePlayer(),
    name: 'Quarantine Specialist',
    traits: [
      {
        ...baseTrait(),
        description:
          'Prevent disease cube placements (and outbreaks) in the city you are in and all cities connected to it.',
      },
    ],
  };
  const Contingency_Planner: Player = {
    ...basePlayer(),
    name: 'Contingency Planner',
    traits: [
      {
        ...baseTrait(),
        description:
          "As an action, take any discarded Event card and store it on this player's card (Limit 1)." +
          'When you play the stored Event card, remove it from the game.',
      },
    ],
  };
  return {
    Scientist,
    Researcher,
    Medic,
    Dispatcher,
    Operations_Expert,
    Quarantine_Specialist,
    Contingency_Planner,
  };
};

export const createPandemicBaseLocationDictionary = () => {
  let id = 1;
  const baseLocation = () => {
    return {
      __typename: 'Location',
      id: `location-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
      resourcePiles: [],
      tags: [],
    };
  };
  const San_Francisco: Location = {
    ...baseLocation(),
    name: 'San Francisco',
    color: LocationColor.BLUE,
    position: { x: -41, y: 11, __typename: 'Position' },
  };
  const Chicago: Location = {
    ...baseLocation(),
    name: 'Chicago',
    color: LocationColor.BLUE,
    position: { x: -33, y: 13, __typename: 'Position' },
  };
  const Atlanta: Location = {
    ...baseLocation(),
    name: 'Atlanta',
    color: LocationColor.BLUE,
    position: { x: -30, y: 8, __typename: 'Position' },
  };
  const Montreal: Location = {
    ...baseLocation(),
    name: 'Montreal',
    color: LocationColor.BLUE,
    position: { x: -26, y: 13, __typename: 'Position' },
  };
  const Washington: Location = {
    ...baseLocation(),
    name: 'Washington',
    color: LocationColor.BLUE,
    position: { x: -23, y: 9, __typename: 'Position' },
  };
  const New_York: Location = {
    ...baseLocation(),
    name: 'New York',
    color: LocationColor.BLUE,
    position: { x: -20, y: 13, __typename: 'Position' },
  };
  const Madrid: Location = {
    ...baseLocation(),
    name: 'Madrid',
    color: LocationColor.BLUE,
    position: { x: -9, y: 10, __typename: 'Position' },
  };
  const London: Location = {
    ...baseLocation(),
    name: 'London',
    color: LocationColor.BLUE,
    position: { x: -8, y: 17, __typename: 'Position' },
  };
  const Paris: Location = {
    ...baseLocation(),
    name: 'Paris',
    color: LocationColor.BLUE,
    position: { x: -3, y: 13, __typename: 'Position' },
  };
  const Essen: Location = {
    ...baseLocation(),
    name: 'Essen',
    color: LocationColor.BLUE,
    position: { x: -1, y: 18, __typename: 'Position' },
  };
  const Milan: Location = {
    ...baseLocation(),
    name: 'Milan',
    color: LocationColor.BLUE,
    position: { x: 2, y: 15, __typename: 'Position' },
  };
  const St_Petersburg: Location = {
    ...baseLocation(),
    name: 'St. Petersburg',
    color: LocationColor.BLUE,
    position: { x: 7, y: 20, __typename: 'Position' },
  };
  const Los_Angeles: Location = {
    ...baseLocation(),
    name: 'Los Angeles',
    color: LocationColor.YELLOW,
    position: { x: -40, y: 4, __typename: 'Position' },
  };
  const Mexico_City: Location = {
    ...baseLocation(),
    name: 'Mexico City',
    color: LocationColor.YELLOW,
    position: { x: -34, y: 1, __typename: 'Position' },
  };
  const Miami: Location = {
    ...baseLocation(),
    name: 'Miami',
    color: LocationColor.YELLOW,
    position: { x: -26, y: 3, __typename: 'Position' },
  };
  const Bogota: Location = {
    ...baseLocation(),
    name: 'Bogota',
    color: LocationColor.YELLOW,
    position: { x: -27, y: -4, __typename: 'Position' },
  };
  const Lima: Location = {
    ...baseLocation(),
    name: 'Lima',
    color: LocationColor.YELLOW,
    position: { x: -29, y: -12, __typename: 'Position' },
  };
  const Santiago: Location = {
    ...baseLocation(),
    name: 'Santiago',
    color: LocationColor.YELLOW,
    position: { x: -28, y: -20, __typename: 'Position' },
  };
  const Buenos_Aires: Location = {
    ...baseLocation(),
    name: 'Buenos Aires',
    color: LocationColor.YELLOW,
    position: { x: -21, y: -18, __typename: 'Position' },
  };
  const Sao_Paulo: Location = {
    ...baseLocation(),
    name: 'Sao Paulo',
    color: LocationColor.YELLOW,
    position: { x: -17, y: -13, __typename: 'Position' },
  };
  const Lagos: Location = {
    ...baseLocation(),
    name: 'Lagos',
    color: LocationColor.YELLOW,
    position: { x: -3, y: -3, __typename: 'Position' },
  };
  const Kinshasa: Location = {
    ...baseLocation(),
    name: 'Kinshasa',
    color: LocationColor.YELLOW,
    position: { x: 1, y: -8, __typename: 'Position' },
  };
  const Johannesburg: Location = {
    ...baseLocation(),
    name: 'Johannesburg',
    color: LocationColor.YELLOW,
    position: { x: 5, y: -15, __typename: 'Position' },
  };
  const Khartoum: Location = {
    ...baseLocation(),
    name: 'Khartoum',
    color: LocationColor.YELLOW,
    position: { x: 6, y: -2, __typename: 'Position' },
  };
  const Algiers: Location = {
    ...baseLocation(),
    name: 'Algiers',
    color: LocationColor.BLACK,
    position: { x: -1, y: 6, __typename: 'Position' },
  };
  const Istanbul: Location = {
    ...baseLocation(),
    name: 'Istanbul',
    color: LocationColor.BLACK,
    position: { x: 5, y: 11, __typename: 'Position' },
  };
  const Cairo: Location = {
    ...baseLocation(),
    name: 'Cairo',
    color: LocationColor.BLACK,
    position: { x: 4, y: 5, __typename: 'Position' },
  };
  const Baghdad: Location = {
    ...baseLocation(),
    name: 'Baghdad',
    color: LocationColor.BLACK,
    position: { x: 10, y: 7, __typename: 'Position' },
  };
  const Moscow: Location = {
    ...baseLocation(),
    name: 'Moscow',
    color: LocationColor.BLACK,
    position: { x: 11, y: 15, __typename: 'Position' },
  };
  const Riyadh: Location = {
    ...baseLocation(),
    name: 'Riyadh',
    color: LocationColor.BLACK,
    position: { x: 11, y: 1, __typename: 'Position' },
  };
  const Tehran: Location = {
    ...baseLocation(),
    name: 'Tehran',
    color: LocationColor.BLACK,
    position: { x: 15, y: 11, __typename: 'Position' },
  };
  const Karachi: Location = {
    ...baseLocation(),
    name: 'Karachi',
    color: LocationColor.BLACK,
    position: { x: 16, y: 5, __typename: 'Position' },
  };
  const Mumbai: Location = {
    ...baseLocation(),
    name: 'Mumbai',
    color: LocationColor.BLACK,
    position: { x: 17, y: 0, __typename: 'Position' },
  };
  const Delhi: Location = {
    ...baseLocation(),
    name: 'Delhi',
    color: LocationColor.BLACK,
    position: { x: 21, y: 7, __typename: 'Position' },
  };
  const Chennai: Location = {
    ...baseLocation(),
    name: 'Chennai',
    color: LocationColor.BLACK,
    position: { x: 22, y: -4, __typename: 'Position' },
  };
  const Kolkata: Location = {
    ...baseLocation(),
    name: 'Kolkata',
    color: LocationColor.BLACK,
    position: { x: 26, y: 5, __typename: 'Position' },
  };
  const Beijing: Location = {
    ...baseLocation(),
    name: 'Beijing',
    color: LocationColor.RED,
    position: { x: 30, y: 13, __typename: 'Position' },
  };
  const Seoul: Location = {
    ...baseLocation(),
    name: 'Seoul',
    color: LocationColor.RED,
    position: { x: 36, y: 14, __typename: 'Position' },
  };
  const Shanghai: Location = {
    ...baseLocation(),
    name: 'Shanghai',
    color: LocationColor.RED,
    position: { x: 31, y: 8, __typename: 'Position' },
  };
  const Tokyo: Location = {
    ...baseLocation(),
    name: 'Tokyo',
    color: LocationColor.RED,
    position: { x: 41, y: 11, __typename: 'Position' },
  };
  const Hong_Kong: Location = {
    ...baseLocation(),
    name: 'Hong Kong',
    color: LocationColor.RED,
    position: { x: 32, y: 2, __typename: 'Position' },
  };
  const Taipei: Location = {
    ...baseLocation(),
    name: 'Taipei',
    color: LocationColor.RED,
    position: { x: 37, y: 4, __typename: 'Position' },
  };
  const Osaka: Location = {
    ...baseLocation(),
    name: 'Osaka',
    color: LocationColor.RED,
    position: { x: 42, y: 5, __typename: 'Position' },
  };
  const Bangkok: Location = {
    ...baseLocation(),
    name: 'Bangkok',
    color: LocationColor.RED,
    position: { x: 27, y: -1, __typename: 'Position' },
  };
  const Ho_Chi_Minh_City: Location = {
    ...baseLocation(),
    name: 'Ho Chi Minh City',
    color: LocationColor.RED,
    position: { x: 33, y: -6, __typename: 'Position' },
  };
  const Manila: Location = {
    ...baseLocation(),
    name: 'Manila',
    color: LocationColor.RED,
    position: { x: 37, y: -5, __typename: 'Position' },
  };
  const Jakarta: Location = {
    ...baseLocation(),
    name: 'Jakarta',
    color: LocationColor.RED,
    position: { x: 26, y: -10, __typename: 'Position' },
  };
  const Sydney: Location = {
    ...baseLocation(),
    name: 'Sydney',
    color: LocationColor.RED,
    position: { x: 42, y: -19, __typename: 'Position' },
  };
  return {
    San_Francisco,
    Chicago,
    Atlanta,
    Montreal,
    Washington,
    New_York,
    Madrid,
    London,
    Paris,
    Essen,
    Milan,
    St_Petersburg,
    Los_Angeles,
    Mexico_City,
    Miami,
    Bogota,
    Lima,
    Santiago,
    Buenos_Aires,
    Sao_Paulo,
    Lagos,
    Kinshasa,
    Johannesburg,
    Khartoum,
    Algiers,
    Istanbul,
    Cairo,
    Baghdad,
    Moscow,
    Riyadh,
    Tehran,
    Karachi,
    Mumbai,
    Delhi,
    Chennai,
    Kolkata,
    Beijing,
    Seoul,
    Shanghai,
    Tokyo,
    Hong_Kong,
    Taipei,
    Osaka,
    Bangkok,
    Ho_Chi_Minh_City,
    Manila,
    Jakarta,
    Sydney,
  };
};

export const createPandemicBaseRouteList = (l: LocationDictionary) => {
  let id = 1;
  const createRoute = (
    start: Location,
    end: Location,
    isWrapping?: boolean
  ) => {
    return {
      __typename: 'Route',
      id: `route-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
      start,
      end,
      resourcePiles: [],
      tags: [],
      isWrapping: isWrapping || false,
    };
  };
  return [
    createRoute(l.San_Francisco, l.Tokyo, true),
    createRoute(l.San_Francisco, l.Manila, true),
    createRoute(l.San_Francisco, l.Chicago),
    createRoute(l.San_Francisco, l.Los_Angeles),
    createRoute(l.Chicago, l.Los_Angeles),
    createRoute(l.Chicago, l.Mexico_City),
    createRoute(l.Chicago, l.Atlanta),
    createRoute(l.Chicago, l.Montreal),
    createRoute(l.Atlanta, l.Miami),
    createRoute(l.Atlanta, l.Washington),
    createRoute(l.Montreal, l.New_York),
    createRoute(l.Montreal, l.Washington),
    createRoute(l.Washington, l.Miami),
    createRoute(l.Washington, l.New_York),
    createRoute(l.New_York, l.London),
    createRoute(l.New_York, l.Madrid),
    createRoute(l.Madrid, l.London),
    createRoute(l.Madrid, l.Paris),
    createRoute(l.Madrid, l.Algiers),
    createRoute(l.Madrid, l.Sao_Paulo),
    createRoute(l.London, l.Paris),
    createRoute(l.London, l.Essen),
    createRoute(l.Paris, l.Essen),
    createRoute(l.Paris, l.Milan),
    createRoute(l.Paris, l.Algiers),
    createRoute(l.Essen, l.Milan),
    createRoute(l.Essen, l.St_Petersburg),
    createRoute(l.Milan, l.Istanbul),
    createRoute(l.St_Petersburg, l.Moscow),
    createRoute(l.St_Petersburg, l.Istanbul),
    createRoute(l.Los_Angeles, l.Sydney, true),
    createRoute(l.Los_Angeles, l.Mexico_City),
    createRoute(l.Mexico_City, l.Miami),
    createRoute(l.Mexico_City, l.Bogota),
    createRoute(l.Mexico_City, l.Lima),
    createRoute(l.Lima, l.Santiago),
    createRoute(l.Lima, l.Bogota),
    createRoute(l.Miami, l.Bogota),
    createRoute(l.Bogota, l.Sao_Paulo),
    createRoute(l.Bogota, l.Buenos_Aires),
    createRoute(l.Buenos_Aires, l.Sao_Paulo),
    createRoute(l.Lagos, l.Sao_Paulo),
    createRoute(l.Lagos, l.Kinshasa),
    createRoute(l.Lagos, l.Khartoum),
    createRoute(l.Kinshasa, l.Khartoum),
    createRoute(l.Kinshasa, l.Johannesburg),
    createRoute(l.Khartoum, l.Johannesburg),
    createRoute(l.Khartoum, l.Cairo),
    createRoute(l.Algiers, l.Cairo),
    createRoute(l.Algiers, l.Istanbul),
    createRoute(l.Istanbul, l.Cairo),
    createRoute(l.Istanbul, l.Baghdad),
    createRoute(l.Istanbul, l.Moscow),
    createRoute(l.Cairo, l.Baghdad),
    createRoute(l.Cairo, l.Riyadh),
    createRoute(l.Baghdad, l.Riyadh),
    createRoute(l.Baghdad, l.Tehran),
    createRoute(l.Baghdad, l.Karachi),
    createRoute(l.Moscow, l.Tehran),
    createRoute(l.Tehran, l.Karachi),
    createRoute(l.Tehran, l.Delhi),
    createRoute(l.Karachi, l.Riyadh),
    createRoute(l.Karachi, l.Delhi),
    createRoute(l.Karachi, l.Mumbai),
    createRoute(l.Delhi, l.Mumbai),
    createRoute(l.Delhi, l.Kolkata),
    createRoute(l.Delhi, l.Chennai),
    createRoute(l.Chennai, l.Mumbai),
    createRoute(l.Chennai, l.Kolkata),
    createRoute(l.Chennai, l.Bangkok),
    createRoute(l.Chennai, l.Jakarta),
    createRoute(l.Kolkata, l.Bangkok),
    createRoute(l.Kolkata, l.Hong_Kong),
    createRoute(l.Hong_Kong, l.Bangkok),
    createRoute(l.Hong_Kong, l.Ho_Chi_Minh_City),
    createRoute(l.Hong_Kong, l.Manila),
    createRoute(l.Hong_Kong, l.Taipei),
    createRoute(l.Hong_Kong, l.Shanghai),
    createRoute(l.Bangkok, l.Ho_Chi_Minh_City),
    createRoute(l.Bangkok, l.Jakarta),
    createRoute(l.Jakarta, l.Ho_Chi_Minh_City),
    createRoute(l.Jakarta, l.Sydney),
    createRoute(l.Ho_Chi_Minh_City, l.Manila),
    createRoute(l.Manila, l.Sydney),
    createRoute(l.Manila, l.Taipei),
    createRoute(l.Shanghai, l.Taipei),
    createRoute(l.Shanghai, l.Beijing),
    createRoute(l.Shanghai, l.Seoul),
    createRoute(l.Shanghai, l.Tokyo),
    createRoute(l.Taipei, l.Osaka),
    createRoute(l.Tokyo, l.Osaka),
    createRoute(l.Seoul, l.Tokyo),
    createRoute(l.Seoul, l.Beijing),
  ];
};

export const createPandemicBaseResourceDictionary = () => {
  let id = 1;
  const baseResource = () => {
    return {
      __typename: 'Resource',
      id: `resource-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
    };
  };
  const Blue_Disease_Cubes: Resource = {
    ...baseResource(),
    name: 'Blue Disease Cubes',
    stockCount: 24,
  };
  const Red_Disease_Cubes: Resource = {
    ...baseResource(),
    name: 'Red Disease Cubes',
    stockCount: 24,
  };
  const Yellow_Disease_Cubes: Resource = {
    ...baseResource(),
    name: 'Yellow Disease Cubes',
    stockCount: 24,
  };
  const Black_Disease_Cubes: Resource = {
    ...baseResource(),
    name: 'Black Disease Cubes',
    stockCount: 24,
  };
  const Research_Stations: Resource = {
    ...baseResource(),
    name: 'Research Stations',
    stockCount: 6,
  };
  return {
    Blue_Disease_Cubes,
    Red_Disease_Cubes,
    Yellow_Disease_Cubes,
    Black_Disease_Cubes,
    Research_Stations,
  };
};

export const createPandemicBaseActionDictionary = () => {
  let id = 1;
  const baseAction = () => {
    return {
      __typename: 'Trait',
      id: `action-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
      type: TraitType.PLAYER,
    };
  };
  const Drive_Ferry: Trait = {
    ...baseAction(),
    name: 'Drive / Ferry',
    description:
      'Move to a city connected by a white line to the one you are in.',
  };
  const Direct_Flight: Trait = {
    ...baseAction(),
    name: 'Direct Flight',
    description: 'Discard a City card to move to the city named on the card.',
  };
  const Charter_Flight: Trait = {
    ...baseAction(),
    name: 'Charter Flight',
    description:
      'Discard a City card that matches the city you are in to move to any city.',
  };
  const Shuttle_Flight: Trait = {
    ...baseAction(),
    name: 'Shuttle Flight',
    description:
      'Move from a city with a research station to any other city that has a research station.',
  };
  const Build_A_Research_Station: Trait = {
    ...baseAction(),
    name: 'Build A Research Station',
    description:
      'Discard the City card that matches the city you are in to place a research station there.',
  };
  const Treat_Disease: Trait = {
    ...baseAction(),
    name: 'Treat Disease',
    description:
      'Remove 1 disease cube from the city you are in. ' +
      'If this color is cured, remove all cubes of that color from the city.',
  };
  const Share_Knowledge: Trait = {
    ...baseAction(),
    name: 'Share Knowledge',
    description:
      'Either: give the card that matches the city you are in to another player, ' +
      'or take that card from another player. The other player must also be in the city with you.',
  };
  const Discover_A_Cure: Trait = {
    ...baseAction(),
    name: 'Discover A Cure',
    description:
      'At any research station, discard 5 City cards of the same disease color to cure that disease.',
  };
  return {
    Drive_Ferry,
    Direct_Flight,
    Charter_Flight,
    Shuttle_Flight,
    Build_A_Research_Station,
    Treat_Disease,
    Share_Knowledge,
    Discover_A_Cure,
  };
};

export const createPandemicBaseObjectiveList = () => {
  let id = 1;
  const baseObjective = () => {
    return {
      __typename: 'Objective',
      id: `objective-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
    };
  };
  const Objective1 = {
    ...baseObjective(),
    description: 'Discover cures to the 4 diseases.',
    isMandatory: true,
    isComplete: false,
  };
  return [Objective1];
};

export const createPandemicBasePlayerCardList = (
  locationDictionary: LocationDictionary
) => {
  let id = 1;
  const basePlayerCard = () => {
    return {
      __typename: 'PlayerCard',
      id: `player_card-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
      traits: [],
      tags: [],
    };
  };
  const createEpidemicPlayerCards = () => {
    const epidemicPlayerCards = [1, 2, 3, 4, 5, 6].map(() => {
      return {
        ...basePlayerCard(),
        type: PlayerCardType.EPIDEMIC,
        name: 'Epidemic',
      };
    });
    return epidemicPlayerCards;
  };
  const createLocationPlayerCards = () => {
    const baseLocationPlayerCard = () => {
      return {
        ...basePlayerCard(),
        type: PlayerCardType.LOCATION,
      };
    };
    const locationPlayerCards = Object.keys(locationDictionary).map(key => {
      const location = locationDictionary[key];
      return {
        ...baseLocationPlayerCard(),
        name: location.name,
        location,
      };
    });
    return locationPlayerCards;
  };
  const createEventPlayerCards = () => {
    const baseEventPlayerCard = () => {
      return {
        ...basePlayerCard(),
        type: PlayerCardType.EVENT,
      };
    };
    const Resilient_Population = {
      ...baseEventPlayerCard(),
      name: 'Resilient_Population',
      description:
        'Remove any 1 card in the Infection Discard Pile from the game. ' +
        'You may play this between the Infect and Intensify steps of an epidemic.',
    };
    const One_Quiet_Night = {
      ...baseEventPlayerCard(),
      name: 'One Quiet Night',
      description:
        'Skip the next Infect Cities step (do not flip over any Infection cards).',
    };
    const Forecast = {
      ...baseEventPlayerCard(),
      name: 'Forecast',
      description:
        'Draw, look at, and rearrange the top 6 cards of the Infection Deck. Put them back on top.',
    };
    const Airlift = {
      ...baseEventPlayerCard(),
      name: 'Airlift',
      description:
        "Move any 1 pawn to any city. Get permission before moving another player's pawn.",
    };
    const Government_Grant = {
      ...baseEventPlayerCard(),
      name: 'Government Grant',
      description: 'Add 1 research station to any city (no City card needed).',
    };
    return [
      Resilient_Population,
      One_Quiet_Night,
      Forecast,
      Airlift,
      Government_Grant,
    ];
  };
  return [
    ...createEpidemicPlayerCards(),
    ...createLocationPlayerCards(),
    ...createEventPlayerCards(),
  ];
};

export const createPandemicBaseTagList = () => {
  let id = 1;
  const baseTag = () => {
    return {
      __typename: 'Tag',
      id: `tag-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
    };
  };
  return [
    { ...baseTag(), name: 'Blue Disease Status', description: 'Not Cured' },
    { ...baseTag(), name: 'Red Disease Status', description: 'Not Cured' },
    { ...baseTag(), name: 'Yellow Disease Status', description: 'Not Cured' },
    { ...baseTag(), name: 'Black Disease Status', description: 'Not Cured' },
    { ...baseTag(), name: 'Current Infection Rate', description: '2' },
  ];
};

export const createPandemicBaseInfectionCardList = (
  locationDictionary: LocationDictionary
) => {
  let id = 1;
  const baseInfectionCard = () => {
    return {
      __typename: 'InfectionCard',
      id: `infection_card-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
      type: InfectionCardType.LOCATION,
      traits: [],
      tags: [],
    };
  };
  const infectionCards = Object.keys(locationDictionary).map(key => {
    const location = locationDictionary[key];
    return {
      ...baseInfectionCard(),
      name: location.name,
      location,
    };
  });
  return infectionCards;
};

export const createPandemicBaseResourceStockpileList = (
  resourceDictionary: ResourceDictionary
) => {
  let id = 1;
  const baseResourcePile = () => {
    return {
      __typename: 'ResourcePile',
      id: `resource_pile-${id++}`,
      persistanceLevel: PersistanceLevel.ALWAYS,
    };
  };
  return Object.keys(resourceDictionary).map(key => ({
    ...baseResourcePile(),
    resource: resourceDictionary[key],
    count: resourceDictionary[key].stockCount,
  }));
};

export const createPandemicBaseGameState = () => {
  const convertDictionaryToValueList = (dictionary: { [key: string]: any }) =>
    Object.keys(dictionary).map(key => dictionary[key]);
  const playerDictionary = createPandemicBasePlayerDictionary();
  const locationDictionary = createPandemicBaseLocationDictionary();
  const actionDictionary = createPandemicBaseActionDictionary();
  const resourceDictionary = createPandemicBaseResourceDictionary();
  const objectiveList = createPandemicBaseObjectiveList();
  const playerCardList = createPandemicBasePlayerCardList(locationDictionary);
  const routeList = createPandemicBaseRouteList(locationDictionary);
  const tagList = createPandemicBaseTagList();
  const infectionCardList = createPandemicBaseInfectionCardList(
    locationDictionary
  );
  const resourceStockpileList = createPandemicBaseResourceStockpileList(
    resourceDictionary
  );

  const emptyBoardState = createEmptyBoardState();

  const gameState: GameState = {
    __typename: 'GameState',
    players: convertDictionaryToValueList(playerDictionary),
    playerCards: playerCardList,
    infectionCards: infectionCardList,
    resources: convertDictionaryToValueList(resourceDictionary),
    actions: convertDictionaryToValueList(actionDictionary),
    mapState: {
      ...createEmptyMapState(),
      locations: convertDictionaryToValueList(locationDictionary),
      routes: routeList,
    },
    boardState: {
      ...emptyBoardState,
      objectives: objectiveList,
      // TEST DATA BELOW
      players: [
        playerDictionary.Researcher,
        playerDictionary.Scientist,
        playerDictionary.Medic,
        playerDictionary.Dispatcher,
      ],
      tags: tagList,
      resourceStockpiles: resourceStockpileList,
      infectionDeck: {
        ...emptyBoardState.infectionDeck,
        drawPileStacks: [
          {
            __typename: 'InfectionDeckStack',
            shuffledCards: [...infectionCardList],
          },
        ],
      },
      playerDeck: {
        ...emptyBoardState.playerDeck,
        drawPileSizes: [8, 8, 8, 9, 9, 9],
        drawPile: [...playerCardList],
      },
      infectionRate: 2,
    },
  };
  return gameState;
};
