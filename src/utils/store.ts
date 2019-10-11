import { createPandemicBaseGameState } from './pandemic-presets';
import { GameState, InfectionCard, PlayerCard } from '../graphql/types';
import { oc } from 'ts-optchain';
import { parse, stringify } from 'flatted/esm';

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
    Draw_Pile: oc(infectionDeck).drawPileStacks[0].shuffledCards([]),
    Discard_Pile: oc(infectionDeck).discardPile([]),
    Out_Of_Game_Pile: oc(infectionDeck).outOfGamePile([]),
  };
  const a = arrMap[srcDropId].splice(srcIndex, 1)[0];
  arrMap[dstDropId].splice(dstIndex, 0, a);
  console.log(gameState);
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
  console.log(gameState);
  return gameState;
};

export const saveGameState = () => {
  window.localStorage.setItem('game-state', stringify(gameState));
};

export const loadGameState = () => {
  const temp = window.localStorage.getItem('game-state');
  if (temp === null) return;
  gameState = parse(temp);
  console.log(gameState);
};
