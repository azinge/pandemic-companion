/**
 * PlayerDeckModal
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayerDeckModal.styles';
import Modal from 'react-modal';
import {
  PlayerCard,
  LocationColor,
  PlayerDeck,
  Player,
} from '../../../../graphql/types';
import { oc } from 'ts-optchain';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getLightHexColorFromLocationColor } from '../../../../utils/view-logic';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  GET_PLAYER_DECK,
  SAVE_PLAYER_DECK,
} from '../../views/PlayerDeckView/PlayerDeckView.requests';

export interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

const createPlayerCard = (card: PlayerCard, index: number) => {
  return (
    <Draggable
      draggableId={oc(card).id('1')}
      index={index}
      key={oc(card).id('1')}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              style={{
                backgroundColor: getLightHexColorFromLocationColor(
                  oc(card).location.color(LocationColor.MISC)
                ),
                height: 25,
                width: 500,
              }}
            >
              {card.name}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

const createPlayerHands = (players: Player[]) => {
  return players.map((player, index) => (
    <Droppable
      droppableId={`Player_Pile:${index}`}
      type={'PLAYER_CARD'}
      key={oc(player).id('1')}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            minHeight: 50,
            borderStyle: 'solid',
            borderColor: 'grey',
            flex: 1,
          }}
          {...provided.droppableProps}
        >
          {player.name}
          {oc(player)
            .cards([])
            .map((card, index) => {
              return createPlayerCard(card, index);
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ));
};

Modal.setAppElement('#root');
const PlayerDeckModal: React.FC<Props> = (props: Props) => {
  const [savePlayerDeck] = useMutation(SAVE_PLAYER_DECK, {
    refetchQueries: () => ['GET_PLAYER_DECK'],
  });
  const { data } = useQuery(GET_PLAYER_DECK, {
    fetchPolicy: 'no-cache',
  });

  const onDragEnd = React.useCallback(
    (result, provided) => {
      if (result.destination === null) return;
      savePlayerDeck({
        variables: {
          srcDropId: result.source.droppableId,
          srcIndex: result.source.index,
          dstDropId: result.destination.droppableId,
          dstIndex: result.destination.index,
        },
      });
    },
    [savePlayerDeck]
  );

  const playerDeck: PlayerDeck = oc(data).gameState.boardState.playerDeck();
  const droppableDict = {
    Draw_Pile: oc(playerDeck).drawPile([]),
    Discard_Pile: oc(playerDeck).discardPile([]),
    Out_Of_Game_Pile: oc(playerDeck).outOfGamePile([]),
  };
  const players = oc(data).gameState.boardState.players([]);
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel='Players'
    >
      <div>
        <h1>PlayerDeckModal</h1>
        <button onClick={props.closeModal}>close modal</button>
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              // overflowY: 'scroll',
            }}
          >
            <div
              style={{
                flex: 1,
                borderStyle: 'solid',
                margin: 5,
                padding: 5,
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              Draw Pile
              <Droppable droppableId={'Draw_Pile'} type={'PLAYER_CARD'}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={{
                      minHeight: 50,
                      borderStyle: 'solid',
                      borderColor: 'grey',
                      flex: 1,
                    }}
                    {...provided.droppableProps}
                  >
                    {droppableDict['Draw_Pile'].map((card, index) => {
                      return createPlayerCard(card, index);
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderStyle: 'solid',
                  margin: 5,
                  padding: 5,
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                Players
                {createPlayerHands(players)}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderStyle: 'solid',
                  margin: 5,
                  padding: 5,
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                Discard Pile
                <Droppable droppableId={'Discard_Pile'} type={'PLAYER_CARD'}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        minHeight: 50,
                        borderStyle: 'solid',
                        borderColor: 'grey',
                        flex: 1,
                      }}
                      {...provided.droppableProps}
                    >
                      {droppableDict['Discard_Pile'].map((card, index) => {
                        return createPlayerCard(card, index);
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div
                style={{
                  flex: 1,
                  borderStyle: 'solid',
                  margin: 5,
                  padding: 5,
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                Out of Game Pile
                <Droppable
                  droppableId={'Out_Of_Game_Pile'}
                  type={'PLAYER_CARD'}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        minHeight: 50,
                        borderStyle: 'solid',
                        borderColor: 'grey',
                        flex: 1,
                      }}
                      {...provided.droppableProps}
                    >
                      {droppableDict['Out_Of_Game_Pile'].map((card, index) => {
                        return createPlayerCard(card, index);
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </Modal>
  );
};

export default PlayerDeckModal;
