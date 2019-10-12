/**
 * AlertSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './AlertSettingsPanel.styles';
import { Tag } from '../../../../../graphql/types';

export interface Props {}

const AlertSettingsPanel: React.FC<Props> = (props: Props) => {
  const alerts: Tag[] = [{ id: 'test', description: 'New Mexico at risk!' }];
  return (
    <div>
      <h1>AlertSettingsPanel</h1>
      <h2 style={{ textAlign: 'center', fontSize: 15 }}>Alerts:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div>
          {alerts.map(alert => (
            <div key={alert.id}>{alert.description}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertSettingsPanel;
