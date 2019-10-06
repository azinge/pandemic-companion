/**
 * PlayersView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayersView.styles';
import { Player } from '../../../../graphql/types';

export interface Props {}

const PlayersView: React.FC = (props: Props) => {
  const players: Player[] = [
    { name: 'Luna' },
    { name: 'Minerva' },
    { name: 'Draco' },
    { name: 'Severus' },
  ];
  return (
    <div
      style={{
        flex: 2,
        padding: 10,
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: 1,
          borderColor: 'white',
          borderWidth: 10,
          borderStyle: 'solid',
          borderRadius: 10,
        }}
      >
        <h1 style={{ paddingLeft: 20 }}>Players:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {players.map(player => (
            <div>
              <h3>{player.name}</h3>
              <div>Supply Cubes: 2</div>
              <div>Roles: A, B, C</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersView;
