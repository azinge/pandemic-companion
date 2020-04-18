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
  InfectionDeckStack,
} from '../../../../graphql/types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_INFECTION_DECK,
  SAVE_INFECTION_DECK,
  CREATE_INFECTION_DECK_STACK,
  DELETE_INFECTION_DECK_STACK,
} from '../../views/InfectionDeckView/InfectionDeckView.requests';
import { oc } from 'ts-optchain';
import { getLightHexColorFromLocationColor } from '../../../../utils/view-logic';
import { useCallback } from 'react';

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
                backgroundColor: getLightHexColorFromLocationColor(
                  oc(card).location.color(LocationColor.MISC)
                ),
                height: 25,
                width: 500,
                color: 'black',
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

const createDrawPileStacks = (
  drawPileStacks: InfectionDeckStack[],
  deleteInfectionDeckStack: (index: number) => void
) => {
  return drawPileStacks.map((drawPileStack, index) => (
    <Droppable
      droppableId={`Draw_Pile_Stack:${index}`}
      type={'INFECTION_CARD'}
      key={`${index}`}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            minHeight: 50,
            borderStyle: 'solid',
            borderColor: 'grey',
          }}
          {...provided.droppableProps}
        >
          {oc(drawPileStack)
            .shuffledCards([])
            .map((card, index) => {
              return createInfectionCard(card, index);
            })}
          {provided.placeholder}
          <button onClick={() => deleteInfectionDeckStack(index)}>
            delete stack
          </button>
        </div>
      )}
    </Droppable>
  ));
};

Modal.setAppElement('#root');
const InfectionDeckModal: React.FC<Props> = (props: Props) => {
  const [saveInfectionDeck] = useMutation(SAVE_INFECTION_DECK, {
    refetchQueries: () => ['GET_INFECTION_DECK'],
  });
  const [createInfectionDeckStack] = useMutation(CREATE_INFECTION_DECK_STACK, {
    refetchQueries: () => ['GET_INFECTION_DECK'],
  });
  const [deleteInfectionDeckStack] = useMutation(DELETE_INFECTION_DECK_STACK, {
    refetchQueries: () => ['GET_INFECTION_DECK'],
  });
  const { data } = useQuery(GET_INFECTION_DECK, {
    fetchPolicy: 'no-cache',
  });
  const infectionDeck: InfectionDeck = oc(
    data
  ).gameState.boardState.infectionDeck({});
  const drawPileStacks = oc(infectionDeck).drawPileStacks([]);

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
              <button
                onClick={() => {
                  createInfectionDeckStack();
                }}
              >
                Create Draw Stack
              </button>
              {createDrawPileStacks(drawPileStacks, (index: number) => {
                deleteInfectionDeckStack({ variables: { index } });
              })}
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
