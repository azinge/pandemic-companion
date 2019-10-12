/**
 * ObjectiveSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ObjectiveSettingsPanel.styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_OBJECTIVES } from '../../../views/ObjectivesView/ObjectivesView.requests';
import { oc } from 'ts-optchain';
import { Objective } from '../../../../../graphql/types';

export interface Props {}

const ObjectiveSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_OBJECTIVES);
  const objectives = oc(data).gameState.boardState.objectives([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>ObjectiveSettingsPanel</h1>
      <h2 style={{ paddingLeft: 20 }}>Objectives:</h2>
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
          {objectives.map((objective: Objective) => (
            <div key={objective.id}>{`${
              objective.isMandatory ? 'Mandatory' : 'Optional'
            }: ${objective.description}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectiveSettingsPanel;
