/**
 * PlayerCardSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayerCardSettingsPanel.styles';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { PlayerCard } from '../../../../../graphql/types';
import { oc } from 'ts-optchain';
import { GET_PLAYER_CARDS_INFO } from './PlayerCardSettingsPanel.requests';

export interface Props {}

const PlayerCardSettingsPanel: React.FC<Props> = (props: Props) => {
  const [selectedPlayerCard, setSelectedPlayerCard] = useState<PlayerCard>({});
  const { data } = useQuery(GET_PLAYER_CARDS_INFO, {
    fetchPolicy: 'no-cache',
  });
  const playerCards: PlayerCard[] = oc(data).gameState.playerCards([]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <h1>PlayerCardSettingsPanel</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: 600,
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
            overflow: 'auto',
          }}
        >
          PlayerCards
          {playerCards.map(playerCard => {
            return (
              <div
                key={playerCard.id}
                onClick={() => {
                  setSelectedPlayerCard(playerCard);
                }}
              >
                {playerCard.name}
              </div>
            );
          })}
        </div>
        <div
          style={{
            flex: 3,
            borderStyle: 'solid',
            margin: 5,
            padding: 5,
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          PlayerCard Edit Form
          {oc(selectedPlayerCard).id(undefined) ? (
            <div>{oc(selectedPlayerCard).name('')}</div>
          ) : (
            <div>Select an Player Card</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCardSettingsPanel;
