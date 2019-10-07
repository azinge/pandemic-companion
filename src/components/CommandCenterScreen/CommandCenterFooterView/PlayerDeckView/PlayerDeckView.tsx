/**
 * PlayerDeckView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayerDeckView.styles';
import { Tag, PlayerCardType, PlayerCard } from '../../../../graphql/types';
import { GET_PLAYER_DECK } from './PlayerDeckView.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';

export interface Props {
  openModal: () => void;
}

const PlayerDeckView: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_PLAYER_DECK);
  const drawPile = oc(data).gameState.boardState.playerDeck.drawPile([]);
  const drawPileSizes = oc(data).gameState.boardState.playerDeck.drawPileSizes(
    []
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;

  let numEventCardsInDrawPile = 0;
  drawPile.forEach((card: PlayerCard) => {
    if (oc(card).type(PlayerCardType.MISC) === PlayerCardType.EVENT)
      numEventCardsInDrawPile++;
  });
  console.log(drawPile);
  const playerDeckStats: Tag[] = [
    {
      description: `${(1 / drawPileSizes[0] +
        (((drawPileSizes[0] - 1) / drawPileSizes[0]) * 1) /
          (drawPileSizes[0] - 1)) *
        100} % chance of drawing an epidemic after current turn.`,
    },
    {
      description: `${numEventCardsInDrawPile} more event cards left in the draw pile.`,
    },
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
        <h1 style={{ paddingLeft: 20, fontSize: 15 }}>Player Deck:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <button onClick={props.openModal}>open modal</button>
          <div>
            {playerDeckStats.map(playerDeckStat => (
              <div>{playerDeckStat.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDeckView;
