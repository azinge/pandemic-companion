/**
 * PlayerSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayerSettingsPanel.styles';
import { GET_PLAYERS_INFO } from './PlayerSettingsPanel.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';
import { Player } from '../../../../../graphql/types';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface Props {}

const PlayerSettingsPanel: React.FC<Props> = (props: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>({});
  const { data } = useQuery(GET_PLAYERS_INFO);
  const players: Player[] = oc(data).gameState.players([]);
  const activePlayers: Player[] = oc(data).gameState.boardState.players([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <h1>PlayerSettingsPanel</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
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
          {players.map(player => {
            return (
              <div
                key={player.id}
                onClick={() => {
                  setSelectedPlayer(player);
                }}
              >
                {player.name}
              </div>
            );
          })}
        </div>
        <div
          style={{
            flex: 3,
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          <div
            style={{
              flex: 5,
              borderStyle: 'solid',
              margin: 5,
              padding: 5,
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            Player Edit Form
            {oc(selectedPlayer).id(undefined) ? (
              <div>{oc(selectedPlayer).name('')}</div>
            ) : (
              <div>Select a Player</div>
            )}
          </div>
          <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId={'Active_Players'} direction={'horizontal'}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    flex: 1,
                    borderStyle: 'solid',
                    margin: 5,
                    padding: 5,
                    flexDirection: 'row',
                    display: 'flex',
                  }}
                  {...provided.droppableProps}
                >
                  {activePlayers.map((player, index) => {
                    return (
                      <Draggable
                        draggableId={oc(player).id('1')}
                        index={index}
                        key={player.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div style={{ backgroundColor: 'yellow' }}>
                              {player.name}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettingsPanel;
