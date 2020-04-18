import { createPandemicBaseGameState } from './pandemic-presets';
import {
  GameState,
  InfectionCard,
  PlayerCard,
  Objective,
  PersistanceLevel,
  ResourcePile,
  Tag,
  Resource,
  Trait,
  TraitType,
} from '../graphql/types';
import { oc } from 'ts-optchain';
import { parse, stringify } from 'flatted/esm';
import uniqid from 'uniqid';

let gameState: GameState = createPandemicBaseGameState();

export const getGameState = () => {
  return gameState;
};

type InfectionCardListMap = {
  [key: string]: InfectionCard[];
};

type PlayerCardListMap = {
  [key: string]: PlayerCard[];
};

export const saveInfectionDeck = (
  srcDropId: string,
  srcIndex: number,
  dstDropId: string,
  dstIndex: number
) => {
  const infectionDeck = oc(gameState).boardState.infectionDeck({});
  const arrMap: InfectionCardListMap = {
    Discard_Pile: oc(infectionDeck).discardPile([]),
    Out_Of_Game_Pile: oc(infectionDeck).outOfGamePile([]),
  };
  oc(infectionDeck)
    .drawPileStacks([])
    .forEach((drawPileStack, index) => {
      arrMap[`Draw_Pile_Stack:${index}`] = oc(drawPileStack).shuffledCards([]);
    });
  const a = arrMap[srcDropId].splice(srcIndex, 1)[0];
  arrMap[dstDropId].splice(dstIndex, 0, a);
  return gameState;
};

export const savePlayerDeck = (
  srcDropId: string,
  srcIndex: number,
  dstDropId: string,
  dstIndex: number
) => {
  const playerDeck = oc(gameState).boardState.playerDeck({});
  const arrMap: PlayerCardListMap = {
    Draw_Pile: oc(playerDeck).drawPile([]),
    Discard_Pile: oc(playerDeck).discardPile([]),
    Out_Of_Game_Pile: oc(playerDeck).outOfGamePile([]),
  };
  oc(gameState)
    .boardState.players([])
    .forEach((player, index) => {
      arrMap[`Player_Pile:${index}`] = oc(player).cards([]);
    });
  const a = arrMap[srcDropId].splice(srcIndex, 1)[0];
  arrMap[dstDropId].splice(dstIndex, 0, a);
  return gameState;
};

export const createObjective = () => {
  oc(gameState)
    .boardState.objectives([])
    .push({
      __typename: 'Objective',
      id: uniqid('objective-'),
      persistanceLevel: PersistanceLevel.ALWAYS,
      description: 'Enter Objective Description.',
      isMandatory: false,
      isComplete: false,
    });
};

export const updateObjective = (id: string, data: Objective) => {
  const o = oc(gameState)
    .boardState.objectives([])
    .find(objective => objective.id === id);
  if (!o) return;
  Object.assign(o || {}, data);
};

export const deleteObjective = (id: string) => {
  const boardState = oc(gameState).boardState({});
  boardState.objectives = oc(boardState)
    .objectives([])
    .filter(objective => {
      return objective.id !== id;
    });
};

export const createResourceStockpile = () => {
  const resourcePile = {
    __typename: 'ResourcePile',
    id: uniqid('resource_pile-'),
    persistanceLevel: PersistanceLevel.ALWAYS,
    resource: {
      __typename: 'Resource',
      id: uniqid('resource-'),
      persistanceLevel: PersistanceLevel.ALWAYS,
      name: 'Enter Resource Name.',
      stockCount: 0,
    },
    count: 0,
    tags: [],
  };
  oc(gameState)
    .boardState.resourceStockpiles([])
    .push(resourcePile);
  oc(gameState)
    .resources([])
    .push(resourcePile.resource);
};

export const updateResourceStockpile = (
  id: string,
  data: ResourcePile,
  resourceData: Resource
) => {
  const o = oc(gameState)
    .boardState.resourceStockpiles([])
    .find(resourceStockpile => resourceStockpile.id === id);
  if (!o) return;
  Object.assign(o || {}, data);
  Object.assign(o.resource, resourceData);
};

export const deleteResourceStockpile = (id: string) => {
  const boardState = oc(gameState).boardState({});
  const rsp = oc(boardState)
    .resourceStockpiles([])
    .find(rsp => rsp.id === id);
  boardState.resourceStockpiles = oc(boardState)
    .resourceStockpiles([])
    .filter(resourceStockpile => {
      return resourceStockpile.id !== id;
    });
  gameState.resources = oc(gameState)
    .resources([])
    .filter(resource => {
      return resource.id !== oc(rsp).resource.id(undefined);
    });
};

export const createGlobalTag = () => {
  oc(gameState)
    .boardState.tags([])
    .push({
      __typename: 'Tag',
      id: uniqid('tag-'),
      persistanceLevel: PersistanceLevel.ALWAYS,
      name: 'Enter Tag Name.',
      description: 'Enter Tag Description.',
    });
};

export const updateGlobalTag = (id: string, data: Tag) => {
  const o = oc(gameState)
    .boardState.tags([])
    .find(tag => tag.id === id);
  Object.assign(o || {}, data);
};

export const deleteGlobalTag = (id: string) => {
  const boardState = oc(gameState).boardState({});
  boardState.tags = oc(boardState)
    .tags([])
    .filter(tag => {
      return tag.id !== id;
    });
};

export const createNote = () => {
  oc(gameState)
    .boardState.notes([])
    .push({
      __typename: 'Note',
      id: uniqid('note-'),
      persistanceLevel: PersistanceLevel.ALWAYS,
      description: 'Enter Note Description.',
    });
};

export const updateNote = (id: string, data: Tag) => {
  const o = oc(gameState)
    .boardState.notes([])
    .find(note => note.id === id);
  Object.assign(o || {}, data);
};

export const deleteNote = (id: string) => {
  const boardState = oc(gameState).boardState({});
  boardState.notes = oc(boardState)
    .notes([])
    .filter(note => {
      return note.id !== id;
    });
};

export const createGlobalAction = () => {
  oc(gameState)
    .actions([])
    .push({
      __typename: 'Action',
      id: uniqid('action-'),
      persistanceLevel: PersistanceLevel.ALWAYS,
      name: 'Enter Action Name.',
      description: 'Enter Action Description.',
      type: TraitType.PLAYER,
    });
};

export const updateGlobalAction = (id: string, data: Trait) => {
  const o = oc(gameState)
    .actions([])
    .find(action => action.id === id);
  Object.assign(o || {}, data);
};

export const deleteGlobalAction = (id: string) => {
  gameState.actions = oc(gameState)
    .actions([])
    .filter(action => {
      return action.id !== id;
    });
};

export const createInfectionDeckStack = () => {
  oc(gameState)
    .boardState.infectionDeck.drawPileStacks([])
    .unshift({
      __typename: 'InfectionDeckStack',
      shuffledCards: [],
    });
};

export const deleteInfectionDeckStack = (index: number) => {
  console.log();
  const infectionDeck = oc(gameState).boardState.infectionDeck({});
  infectionDeck.drawPileStacks = oc(infectionDeck)
    .drawPileStacks([])
    .filter((a, i) => {
      return i !== index;
    });
};

export const updateLocationPosition = (id: string, x: number, y: number) => {
  const o = oc(gameState)
    .mapState.locations([])
    .find(location => location.id === id);
  const position = oc(o).position({});
  Object.assign(position || {}, { x, y });
};

export const saveGameState = () => {
  window.localStorage.setItem('game-state', stringify(gameState));
};

export const loadGameState = () => {
  const temp = window.localStorage.getItem('game-state');
  if (temp === null) return;
  gameState = parse(temp);
};
