/**
 * InfectionDeckView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfectionDeckView.styles';

export interface Props {}

const InfectionDeckView: React.FC = (props: Props) => {
  const infectionDeckStats: string[] = [
    '56% chance of pulling 1 New Mexico',
    '32% chance of pulling 2 New York',
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
        <h1 style={{ paddingLeft: 20 }}>Infection Deck:</h1>
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
            {infectionDeckStats.map(infectionDeckStat => (
              <div>{infectionDeckStat}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionDeckView;
