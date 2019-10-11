/**
 * TraitsView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './TraitsView.styles';
import { Trait, Player } from '../../../../graphql/types';
import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_ACTIONS } from './TraitsView.requests';
import { oc } from 'ts-optchain';

export interface Props {}

const TraitsView: React.FC = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_ACTIONS);
  const actions = oc(data).gameState.actions([]);
  const playerTraits = oc(data)
    .gameState.boardState.players([])
    .map((player: Player) => player.traits)
    .reduce((acc: Trait[], cur: Trait[]) => [...acc, ...cur], []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
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
          overflow: 'auto',
        }}
      >
        <h1 style={{ paddingLeft: 20 }}>Actions:</h1>
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
            {actions.map((action: Trait, index: number) => (
              <div key={index}>{action.description}</div>
            ))}
          </div>
        </div>
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
            {playerTraits.map((playerTrait: Trait, index: number) => (
              <div key={index}>{playerTrait.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraitsView;
