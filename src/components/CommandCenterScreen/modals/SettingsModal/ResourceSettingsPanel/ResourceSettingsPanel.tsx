/**
 * ResourceSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ResourceSettingsPanel.styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_GENERAL_INFO,
  UPDATE_RESOURCE_STOCKPILE,
  DELETE_RESOURCE_STOCKPILE,
  CREATE_RESOURCE_STOCKPILE,
} from '../../../views/InfoPanelView/InfoPanelView.requests';
import { oc } from 'ts-optchain';
import { ResourcePile } from '../../../../../graphql/types';

export interface Props {}

const ResourceItem = ({
  resourceStockpile,
}: {
  resourceStockpile: ResourcePile;
}) => {
  const [inEditMode, setInEditMode] = React.useState(false);
  const [resourceStockpileData, setResourceStockpileData] = React.useState({
    __typename: 'ResourcePile',
    count: resourceStockpile.count,
    tags: resourceStockpile.tags,
  });
  const [resourceData, setResourceData] = React.useState({
    __typename: 'Resource',
    name: oc(resourceStockpile).resource.name(''),
    stockCount: oc(resourceStockpile).resource.stockCount(0),
  });
  React.useEffect(() => {
    setResourceStockpileData(resourceStockpileData => ({
      ...resourceStockpileData,
      count: resourceStockpile.count,
      tags: resourceStockpile.tags,
    }));
    setResourceData(resourceData => ({
      ...resourceData,
      name: oc(resourceStockpile).resource.name(''),
      stockCount: oc(resourceStockpile).resource.stockCount(0),
    }));
  }, [resourceStockpile]);

  const [updateResource] = useMutation(UPDATE_RESOURCE_STOCKPILE, {
    refetchQueries: () => ['GET_GENERAL_INFO'],
  });
  const [deleteResource] = useMutation(DELETE_RESOURCE_STOCKPILE, {
    refetchQueries: () => ['GET_GENERAL_INFO'],
  });
  const renderEditableResource = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <input
          style={{ flex: 2 }}
          type={'text'}
          value={resourceData.name}
          onChange={e => {
            setResourceData({
              ...resourceData,
              name: e.target.value,
            });
          }}
        />
        <div style={{ flex: 2 }}>
          Stock Count:
          <input
            type={'number'}
            value={resourceData.stockCount}
            onChange={e => {
              setResourceData({
                ...resourceData,
                stockCount: +e.target.value,
              });
            }}
          />
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            updateResource({
              variables: {
                id: resourceStockpile.id,
                data: resourceStockpileData,
                resourceData,
              },
            });
            setInEditMode(false);
          }}
        >
          Save
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            deleteResource({
              variables: { id: resourceStockpile.id },
            });
            setInEditMode(false);
          }}
        >
          Delete
        </div>
      </div>
    );
  };
  const renderReadOnlyResource = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 2 }}>
          {`${oc(resourceStockpile).resource.name('')}`}
        </div>
        <div style={{ flex: 2 }}>
          {`${oc(resourceStockpile).resource.stockCount(0)}`}
        </div>
        <div
          style={{ flex: 1 }}
          onClick={() => {
            setInEditMode(true);
          }}
        >
          Edit
        </div>
      </div>
    );
  };
  return inEditMode ? renderEditableResource() : renderReadOnlyResource();
};

const ResourceSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_INFO, {
    fetchPolicy: 'no-cache',
  });
  const [createResourceStockpile] = useMutation(CREATE_RESOURCE_STOCKPILE, {
    refetchQueries: () => ['GET_GENERAL_INFO'],
  });
  const resourceStockpiles = oc(data).gameState.boardState.resourceStockpiles(
    []
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>ResourceSettingsPanel</h1>
      <h2 style={{ paddingLeft: 20 }}>Resources:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {resourceStockpiles.map((resourceStockpile: ResourcePile) => (
          <ResourceItem
            resourceStockpile={resourceStockpile}
            key={resourceStockpile.id}
          />
        ))}
        <div
          onClick={() => {
            createResourceStockpile();
          }}
        >
          Create New Resource
        </div>
      </div>
    </div>
  );
};

export default ResourceSettingsPanel;
