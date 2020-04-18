/**
 * MapView
 */

import * as React from 'react';
import { oc } from 'ts-optchain';
import { Graph } from 'react-d3-graph';

// eslint-disable-next-line
import styles from './MapView.styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_MAP_STATE, UPDATE_LOCATION_POSITION } from './MapView.requests';
import { MapState, LocationColor } from '../../../../graphql/types';
import { getHexColorFromLocationColor } from '../../../../utils/view-logic';
import './MapView.css';
import { useEffect } from 'react';
import { useState } from 'react';

export interface Props {
  setSelectedItem: (item: any) => void;
}

const renderGraph = (
  mapState: MapState,
  graphData: any,
  setSelectedItem: (item: any) => void,
  updateLocationPosition: (id: string, x: number, y: number) => void
) => {
  const locations = oc(mapState).locations([]);
  const routes = oc(mapState).routes([]);
  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  const myConfig = {
    nodeHighlightBehavior: true,
    highlightOpacity: 0.3,
    node: {
      labelProperty: 'name',
      fontColor: 'white',
      color: 'white',
      size: 120,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
    height: '100%', // dimensions.height,
    width: '100%', //dimensions.width,
    // staticGraph: true,
    staticGraphWithDragAndDrop: true,
    maxZoom: 3,
    minZoom: 0.6,
  };

  const onClickNode = (nodeId: string) => {
    const selectedLocation = locations.filter(
      location => location.id === nodeId
    )[0];
    setSelectedItem(selectedLocation);
  };

  const onClickLink = (source: string, target: string) => {
    const selectedRoute = routes.filter(
      route =>
        oc(route).start.id('') === source && oc(route).end.id('') === target
    )[0];
    setSelectedItem(selectedRoute);
  };

  // const onNodePositionChange = (nodeId: string, x: number, y: number) => {
  //   console.log
  //   updateLocationPosition(nodeId, (x - 440) / 9, (y - 210) / -9);
  // };

  return (
    <Graph
      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
      data={graphData}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
      // onNodePositionChange={onNodePositionChange}
    />
  );
};

const MapView: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_MAP_STATE);
  const [updateLocationPosition] = useMutation(UPDATE_LOCATION_POSITION, {
    refetchQueries: () => ['GET_MAP_STATE'],
  });
  const [graphData, setGraphData] = useState<any>({
    nodes: [{ id: '' }],
    links: [],
  });
  useEffect(() => {
    const mapState: MapState = oc(data).gameState.mapState({});
    const locations = oc(mapState).locations([{ id: '' }]);
    const routes = oc(mapState).routes([]);
    setGraphData({
      nodes: locations.map(location => ({
        id: location.id,
        name: location.name,
        color: getHexColorFromLocationColor(
          oc(location).color(LocationColor.MISC)
        ),
        x: oc(location).position.x(0) * 9 + 440,
        y: oc(location).position.y(0) * -9 + 210,
      })),
      links: routes.map(route => ({
        source: oc(route).start.id(''),
        target: oc(route).end.id(''),
        strokeWidth: oc(route).isWrapping(false) ? 0.25 : 1,
      })),
    });
  }, [data]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div
      style={{
        flex: 2.5,
        padding: 0,
        display: 'flex',
        // overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          borderColor: 'white',
          borderWidth: 10,
          borderStyle: 'solid',
          borderRadius: 10,
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <div style={{ left: 10, textAlign: 'center', position: 'absolute' }}>
          <h1>Map:</h1>
        </div>
        {renderGraph(
          data.gameState.mapState,
          graphData,
          props.setSelectedItem,
          (id, x, y) => {
            updateLocationPosition({
              variables: {
                id,
                x,
                y,
              },
            });
          }
        )}
      </div>
    </div>
  );
};

export default MapView;
