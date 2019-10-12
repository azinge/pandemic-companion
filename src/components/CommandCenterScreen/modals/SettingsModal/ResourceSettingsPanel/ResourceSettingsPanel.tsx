/**
 * ResourceSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ResourceSettingsPanel.styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_INFO } from '../../../views/InfoPanelView/InfoPanelView.requests';
import { oc } from 'ts-optchain';
import { ResourcePile } from '../../../../../graphql/types';

export interface Props {}

const ResourceSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_INFO);
  const resourceStockpiles = oc(data).gameState.boardState.resourceStockpiles(
    []
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>ResourceSettingsPanel</h1>
      <h2 style={{ textAlign: 'center', fontSize: 15 }}>Resources:</h2>
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
            ).resource.name('')}: ${
              resourceStockpile.count
            } left in stock.`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceSettingsPanel;
