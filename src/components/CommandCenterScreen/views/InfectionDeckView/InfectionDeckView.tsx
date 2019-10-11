/**
 * InfectionDeckView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfectionDeckView.styles';
import { Tag } from '../../../../graphql/types';
import { GET_INFECTION_DECK } from './InfectionDeckView.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';

export interface Props {
  openModal: () => void;
}

const InfectionDeckView: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_INFECTION_DECK);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  const drawPileStacks = oc(
    data
  ).gameState.boardState.infectionDeck.drawPileStacks([]);

  const infectionDeckStats: Tag[] = [
    {
      description: `${(1 / drawPileStacks[0].shuffledCards.length) *
        100} % chance of drawing any of the ${
        drawPileStacks[0].shuffledCards.length
      } cards at the top of the deck.`,
    },
    {
      description: `${(1 / drawPileStacks[0].shuffledCards.length) *
        100} % chance of drawing any of the ${
        drawPileStacks[0].shuffledCards.length
      } cards at the bottom of the deck.`,
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
          overflow: 'auto',
        }}
      >
        <h1 style={{ paddingLeft: 20, fontSize: 15 }}>Infection Deck:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <button onClick={props.openModal}>open modal</button>
          <div>
            {infectionDeckStats.map((infectionDeckStat, index) => (
              <div key={index}>{infectionDeckStat.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionDeckView;
