/**
 * TraitsView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './TraitsView.styles';

export interface Props {}

const TraitsView: React.FC = (props: Props) => {
  const playerTraits: string[] = [
    'Can take 5 actions instead of 4',
    'Does not recieve scar while in city of plague cube',
  ];
  const cardTraits: string[] = [
    'Counts as 2 when building supply center',
    'Does not remove supply cubes',
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
        <h1 style={{ paddingLeft: 20 }}>Traits:</h1>
        <h3 style={{ paddingLeft: 25 }}>Player Traits:</h3>
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
            {playerTraits.map(playerTrait => (
              <div>{playerTrait}</div>
            ))}
          </div>
        </div>
        <h3 style={{ paddingLeft: 25 }}>Card Traits:</h3>
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
            {cardTraits.map(cardTrait => (
              <div>{cardTrait}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraitsView;
