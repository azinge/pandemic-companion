/**
 * PlayerDeckView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayerDeckView.styles';

export interface Props {}

const PlayerDeckView: React.FC = (props: Props) => {
  const playerDeckStats: string[] = [
    '56% chance of pulling 1 Blue Card',
    '32% chance of pulling an Epidemic',
  ];
  return (
    <div
      style={{
        flex: 1,
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
        <h1 style={{ paddingLeft: 20 }}>Player Deck:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <div>
            {playerDeckStats.map(playerDeckStat => (
              <div>{playerDeckStat}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDeckView;
