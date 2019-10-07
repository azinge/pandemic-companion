/**
 * InfoPanelView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfoPanelView.styles';
import { Resource, Tag } from '../../../../graphql/types';

export interface Props {}

const InfoPanelView: React.FC = (props: Props) => {
  const resources: Resource[] = [
    { name: 'Supply Cubes', stockCount: 32 },
    { name: 'Plague Cubes', stockCount: 8 },
  ];
  const alerts: Tag[] = [{ description: 'New Mexico at risk!' }];
  const tags: Tag[] = [{ description: 'Blue Disease Eradicated' }];
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
              <div>{`${resource.name}: ${resource.stockCount}`}</div>
            ))}
          </div>
          <div>
            {alerts.map(alert => (
              <div>{alert.description}</div>
            ))}
          </div>
          <div>
            {tags.map(tag => (
              <div>{tag.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanelView;
