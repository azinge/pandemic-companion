/**
 * PlayersView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayersView.styles';
import { Player } from '../../../../graphql/types';
import { oc } from 'ts-optchain';
import { useQuery } from '@apollo/react-hooks';
import { GET_PLAYERS } from './PlayersView.requests';

export interface Props {
  openModal: () => void;
}

const PlayersView: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_PLAYERS);
  const players = oc(data).gameState.boardState.players([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
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
        <h1 style={{ paddingLeft: 20, fontSize: 15 }}>Players:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <button onClick={props.openModal}>open modal</button>
          {players.map((player: Player) => (
            <div>
              <h3>{player.name}</h3>
              <div>{`Hand Size: ${oc(player).cards.length(2)}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersView;
