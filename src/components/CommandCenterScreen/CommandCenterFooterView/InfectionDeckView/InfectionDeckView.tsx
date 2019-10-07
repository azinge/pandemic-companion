/**
 * InfectionDeckView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfectionDeckView.styles';
import { Tag } from '../../../../graphql/types';

export interface Props {
  openModal: () => void;
}

const InfectionDeckView: React.FC<Props> = (props: Props) => {
  const infectionDeckStats: Tag[] = [
    { description: '56% chance of pulling 1 New Mexico' },
    { description: '32% chance of pulling 2 New York' },
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
        <button onClick={props.openModal}>open modal</button>
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
              <div>{infectionDeckStat.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionDeckView;
