/**
 * InfectionCardSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfectionCardSettingsPanel.styles';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { InfectionCard } from '../../../../../graphql/types';
import { oc } from 'ts-optchain';
import { GET_INFECTION_CARDS_INFO } from './InfectionCardSettingsPanel.requests';

export interface Props {}

const InfectionCardSettingsPanel: React.FC<Props> = (props: Props) => {
  const [selectedInfectionCard, setSelectedInfectionCard] = useState<
    InfectionCard
  >({});
  const { data } = useQuery(GET_INFECTION_CARDS_INFO);
  const infectionCards: InfectionCard[] = oc(data).gameState.infectionCards([]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <h1>InfectionCardSettingsPanel</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: 600,
        }}
      >
        <div
          style={{
            flex: 1,
            borderStyle: 'solid',
            margin: 5,
            padding: 5,
            flexDirection: 'column',
            display: 'flex',
            overflow: 'auto',
          }}
        >
          InfectionCards
          {infectionCards.map(infectionCard => {
            return (
              <div
                key={infectionCard.id}
                onClick={() => {
                  setSelectedInfectionCard(infectionCard);
                }}
              >
                {infectionCard.name}
              </div>
            );
          })}
        </div>
        <div
          style={{
            flex: 3,
            borderStyle: 'solid',
            margin: 5,
            padding: 5,
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          InfectionCard Edit Form
          {oc(selectedInfectionCard).id(undefined) ? (
            <div>{oc(selectedInfectionCard).name('')}</div>
          ) : (
            <div>Select an Infection Card</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfectionCardSettingsPanel;
