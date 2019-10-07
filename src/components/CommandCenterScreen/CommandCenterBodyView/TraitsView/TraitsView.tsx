/**
 * TraitsView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './TraitsView.styles';
import { Trait, Player } from '../../../../graphql/types';
import { GET_UNIQUE_TRAITS } from './TraitsView.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';

export interface Props {}

const TraitsView: React.FC = (props: Props) => {
  const { data, loading, error } = useQuery(GET_UNIQUE_TRAITS);
  const playerTraits = oc(data)
    .gameState.boardState.players([])
    .map((player: Player) => player.traits)
    .reduce((acc: Trait[], cur: Trait[]) => [...acc, ...cur], []);
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error! :(</div>;
  }

  // const cardTraits: Trait[] = [
  //   { description: 'Counts as 2 when building supply center' },
  //   { description: 'Does not remove supply cubes' },
  // ];
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
        {/* <h3 style={{ paddingLeft: 25 }}>Player Traits:</h3> */}
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
            {playerTraits.map((playerTrait: Trait) => (
              <div>{playerTrait.description}</div>
            ))}
          </div>
        </div>
        {/* <h3 style={{ paddingLeft: 25 }}>Card Traits:</h3>
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
              <div>{cardTrait.description}</div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TraitsView;
