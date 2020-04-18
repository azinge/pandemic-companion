/**
 * InfoPanelView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfoPanelView.styles';
import { Tag, ResourcePile } from '../../../../graphql/types';
import { GET_GENERAL_INFO } from './InfoPanelView.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';

export interface Props {}

const InfoPanelView: React.FC = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_INFO);
  const resourceStockpiles = oc(data).gameState.boardState.resourceStockpiles(
    []
  );
  const tags = oc(data).gameState.boardState.tags([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  const alerts: Tag[] = [{ id: 'test', description: 'New Mexico at risk!' }];
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
          overflow: 'auto',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: 15 }}>
          Resources: - Alerts: - Tags:
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div>
            {resourceStockpiles.map((resourceStockpile: ResourcePile) => (
              <div key={resourceStockpile.id}>{`${oc(
                resourceStockpile
              ).resource.name('')}: ${oc(resourceStockpile).resource.stockCount(
                0
              )} left in stock.`}</div>
            ))}
          </div>
          <div>
            {alerts.map(alert => (
              <div key={alert.id}>{alert.description}</div>
            ))}
          </div>
          <div>
            {tags.map((tag: Tag) => (
              <div key={tag.id}>{`${tag.name}: ${tag.description}`}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanelView;
