import client from './client';
import {
  createEmptyGameState,
  createPandemicBaseGameState,
} from '../utils/pandemic-presets';

export const loadDefaultGameState = () => {
  client.cache.writeData({
    data: {
      gameState: createEmptyGameState(),
    },
  });
};

export const loadPandemicBaseGameState = () => {
  client.cache.writeData({
    data: {
      gameState: createPandemicBaseGameState(),
    },
  });
};
