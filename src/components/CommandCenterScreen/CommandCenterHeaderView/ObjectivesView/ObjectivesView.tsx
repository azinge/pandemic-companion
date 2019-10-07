/**
 * ObjectivesView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ObjectivesView.styles';
import { Objective } from '../../../../graphql/types';
import { GET_OBJECTIVES } from './ObjectivesView.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';

export interface Props {}

const ObjectivesView: React.FC = (props: Props) => {
  const { data, loading, error } = useQuery(GET_OBJECTIVES);
  const objectives = oc(data).gameState.boardState.objectives([]);
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
        }}
      >
        <h1 style={{ paddingLeft: 20 }}>Objectives:</h1>
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
              <div>{`${objective.isMandatory ? 'Mandatory' : 'Optional'}: ${
                objective.description
              }`}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesView;
