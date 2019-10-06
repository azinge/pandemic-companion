/**
 * InfoPanelView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfoPanelView.styles';

export interface Props {}

const InfoPanelView: React.FC = (props: Props) => {
  const resources: string[] = ['Supply Cubes: 32', 'Plague Cubes: 8'];
  const alerts: string[] = ['New Mexico at risk!'];
  const tags: string[] = ['Blue Disease Eradicated'];
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
        <h1 style={{ textAlign: 'center' }}>Resources: - Alerts: - Tags:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div>
            {resources.map(resource => (
              <div>{resource}</div>
            ))}
          </div>
          <div>
            {alerts.map(alert => (
              <div>{alert}</div>
            ))}
          </div>
          <div>
            {tags.map(tag => (
              <div>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanelView;
