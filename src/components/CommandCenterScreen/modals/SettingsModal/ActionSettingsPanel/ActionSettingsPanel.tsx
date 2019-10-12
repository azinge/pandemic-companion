/**
 * ActionSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ActionSettingsPanel.styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_ACTIONS } from '../../../views/TraitsView/TraitsView.requests';
import { oc } from 'ts-optchain';
import { Trait } from '../../../../../graphql/types';

export interface Props {}

const ActionSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_ACTIONS);
  const actions = oc(data).gameState.actions([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>ActionSettingsPanel</h1>
      <h2 style={{ paddingLeft: 20 }}>Actions:</h2>
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
    </div>
  );
};

export default ActionSettingsPanel;
