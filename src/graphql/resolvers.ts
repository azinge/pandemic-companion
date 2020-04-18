import {
  getGameState,
  saveInfectionDeck,
  savePlayerDeck,
  updateObjective,
  createObjective,
  deleteObjective,
  createResourceStockpile,
  updateResourceStockpile,
  deleteResourceStockpile,
  createGlobalTag,
  updateGlobalTag,
  deleteGlobalTag,
  createNote,
  updateNote,
  deleteNote,
  createGlobalAction,
  updateGlobalAction,
  deleteGlobalAction,
  createInfectionDeckStack,
  deleteInfectionDeckStack,
  updateLocationPosition,
} from '../utils/store';

export const resolvers = {
  Query: {
    gameState: (_root: any, variables: any, client: any) => {
      return getGameState();
    },
  },
  Mutation: {
    saveInfectionDeck: (_root: any, variables: any, client: any) => {
      saveInfectionDeck(
        variables.srcDropId,
        variables.srcIndex,
        variables.dstDropId,
        variables.dstIndex
      );
      return getGameState();
    },
    savePlayerDeck: (_root: any, variables: any, client: any) => {
      savePlayerDeck(
        variables.srcDropId,
        variables.srcIndex,
        variables.dstDropId,
        variables.dstIndex
      );
      return getGameState();
    },
    createObjective: (_root: any, variables: any, client: any) => {
      createObjective();
      return getGameState();
    },
    updateObjective: (_root: any, variables: any, client: any) => {
      updateObjective(variables.id, variables.data);
      return getGameState();
    },
    deleteObjective: (_root: any, variables: any, client: any) => {
      deleteObjective(variables.id);
      return getGameState();
    },

    createResourceStockpile: (_root: any, variables: any, client: any) => {
      createResourceStockpile();
      return getGameState();
    },
    updateResourceStockpile: (_root: any, variables: any, client: any) => {
      updateResourceStockpile(
        variables.id,
        variables.data,
        variables.resourceData
      );
      return getGameState();
    },
    deleteResourceStockpile: (_root: any, variables: any, client: any) => {
      deleteResourceStockpile(variables.id);
      return getGameState();
    },

    createGlobalTag: (_root: any, variables: any, client: any) => {
      createGlobalTag();
      return getGameState();
    },
    updateGlobalTag: (_root: any, variables: any, client: any) => {
      updateGlobalTag(variables.id, variables.data);
      return getGameState();
    },
    deleteGlobalTag: (_root: any, variables: any, client: any) => {
      deleteGlobalTag(variables.id);
      return getGameState();
    },

    createNote: (_root: any, variables: any, client: any) => {
      createNote();
      return getGameState();
    },
    updateNote: (_root: any, variables: any, client: any) => {
      updateNote(variables.id, variables.data);
      return getGameState();
    },
    deleteNote: (_root: any, variables: any, client: any) => {
      deleteNote(variables.id);
      return getGameState();
    },

    createGlobalAction: (_root: any, variables: any, client: any) => {
      createGlobalAction();
      return getGameState();
    },
    updateGlobalAction: (_root: any, variables: any, client: any) => {
      updateGlobalAction(variables.id, variables.data);
      return getGameState();
    },
    deleteGlobalAction: (_root: any, variables: any, client: any) => {
      deleteGlobalAction(variables.id);
      return getGameState();
    },

    createInfectionDeckStack: (_root: any, variables: any, client: any) => {
      createInfectionDeckStack();
      return getGameState();
    },
    deleteInfectionDeckStack: (_root: any, variables: any, client: any) => {
      deleteInfectionDeckStack(variables.index);
      return getGameState();
    },

    updateLocationPosition: (_root: any, variables: any, client: any) => {
      updateLocationPosition(variables.id, variables.x, variables.y);
      return getGameState();
    },
  },
};
