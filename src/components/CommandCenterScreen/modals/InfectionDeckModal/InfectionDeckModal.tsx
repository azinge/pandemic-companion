/**
 * InfectionDeckModal
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfectionDeckModal.styles';
import Modal from 'react-modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  InfectionCard,
  InfectionDeck,
  LocationColor,
} from '../../../../graphql/types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_INFECTION_DECK,
  SAVE_INFECTION_DECK,
} from '../../views/InfectionDeckView/InfectionDeckView.requests';
import { oc } from 'ts-optchain';
import { getHexColorFromLocationColor } from '../../../../utils/view-logic';
import { useCallback } from 'react';
import { saveGameState, loadGameState } from '../../../../utils/store';

export interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

const createInfectionCard = (card: InfectionCard, index: number) => {
  if (oc(card).id('1') === '1') console.log(card);
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
                backgroundColor: getHexColorFromLocationColor(
                  oc(card).location.color(LocationColor.MISC)
                ),
                height: 25,
                width: 500,
              }}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

const InfectionDeckModal: React.FC<Props> = (props: Props) => {
  const [saveInfectionDeck] = useMutation(SAVE_INFECTION_DECK, {
    refetchQueries: () => ['GET_INFECTION_DECK'],
  });
  const { data, refetch } = useQuery(GET_INFECTION_DECK);
  const infectionDeck: InfectionDeck = oc(
    data
  ).gameState.boardState.infectionDeck();

  const onDragEnd = useCallback(
    (result, provided) => {
      if (result.destination === null) return;
      saveInfectionDeck({
        variables: {
          srcDropId: result.source.droppableId,
          srcIndex: result.source.index,
          dstDropId: result.destination.droppableId,
          dstIndex: result.destination.index,
        },
      });
    },
    [saveInfectionDeck]
  );

  const droppableDict = {
    Draw_Pile: oc(infectionDeck).drawPileStacks[0].shuffledCards([]),
    Discard_Pile: oc(infectionDeck).discardPile([]),
    Out_Of_Game_Pile: oc(infectionDeck).outOfGamePile([]),
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel='Players'
    >
      <div>
        <h1>InfectionDeckModal</h1>
        <button onClick={props.closeModal}>close modal</button>
        <button onClick={saveGameState}>saveGameState</button>
        <button
          onClick={() => {
            loadGameState();
            refetch();
          }}
        >
          loadGameState
        </button>
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
              <Droppable droppableId={'Draw_Pile'} type={'INFECTION_CARD'}>
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
                      return createInfectionCard(card, index);
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
                Discard Pile
                <Droppable droppableId={'Discard_Pile'} type={'INFECTION_CARD'}>
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
                        return createInfectionCard(card, index);
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
                  type={'INFECTION_CARD'}
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
                        return createInfectionCard(card, index);
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

export default InfectionDeckModal;
