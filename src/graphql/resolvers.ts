import {
  getGameState,
  saveInfectionDeck,
  savePlayerDeck,
} from '../utils/store';

export const resolvers = {
  Query: {
    gameState: (_root: any, variables: any, { cache, getCacheKey }: any) => {
      return getGameState();
    },
  },
  Mutation: {
    saveInfectionDeck: (
      _root: any,
      variables: any,
      { cache, getCacheKey }: any
    ) => {
      saveInfectionDeck(
        variables.srcDropId,
        variables.srcIndex,
        variables.dstDropId,
        variables.dstIndex
      );
      return getGameState();
    },
    savePlayerDeck: (
      _root: any,
      variables: any,
      { cache, getCacheKey }: any
    ) => {
      savePlayerDeck(
        variables.srcDropId,
        variables.srcIndex,
        variables.dstDropId,
        variables.dstIndex
      );
      return getGameState();
    },
  },
};
