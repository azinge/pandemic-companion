/**
 * ObjectivesView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ObjectivesView.styles';
import { Objective } from '../../../../graphql/types';

export interface Props {}

const ObjectivesView: React.FC = (props: Props) => {
  const objectives: Objective[] = [
    { description: 'Build 3 Supply Centers' },
    { description: 'Recon North America' },
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
            {objectives.map(objective => (
              <div>{objective.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesView;
