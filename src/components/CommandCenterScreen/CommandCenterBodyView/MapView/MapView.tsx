/**
 * MapView
 */

import * as React from 'react';
import { oc } from 'ts-optchain';
import { Graph } from 'react-d3-graph';

// eslint-disable-next-line
import styles from './MapView.styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_MAP_STATE } from './MapView.requests';
import { MapState, LocationColor } from '../../../../graphql/types';
import { getHexColorFromLocationColor } from '../../../../utils/view-logic';
import { useEffect } from 'react';
import { useState } from 'react';

export interface Props {}

const renderGraph = (
  mapState: MapState,
  dimensions: { height: number; width: number }
) => {
  const data = {
    nodes: oc(mapState)
      .locations([])
      .map(location => ({
        id: location.id,
        name: location.name,
        color: getHexColorFromLocationColor(
          oc(location).color(LocationColor.MISC)
        ),
        x: oc(location).position.x(0) * 9 + 440,
        y: oc(location).position.y(0) * -9 + 210,
      })),
    links: oc(mapState)
      .routes([])
      .map(route => ({
        source: oc(route).start.id(),
        target: oc(route).end.id(),
        strokeWidth: oc(route).isWrapping(false) ? 0.25 : 1,
      })),
  };

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
    height: dimensions.height,
    width: dimensions.width,
    staticGraph: true,
  };

  return (
    <Graph
      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
      data={data}
      config={myConfig}
    />
  );
};

const MapView: React.FC = (props: Props) => {
  const { data, loading, error } = useQuery(GET_MAP_STATE);
  let div: any;
  const [viewportDimensions, setViewportDimensions] = useState({
    height: 0,
    width: 0,
  });
  useEffect(() => {
    setViewportDimensions({
      height: div.clientHeight - 20,
      width: div.clientWidth - 20,
    });
  }, [oc(div).clientHeight(0), oc(div).clientWidth(0)]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div
      ref={divElement => (div = divElement)}
      style={{
        flex: 2.5,
        padding: 0,
        display: 'flex',
        overflow: 'hidden',
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
        }}
      >
        <h1 style={{ left: 10, textAlign: 'center', position: 'absolute' }}>
          Map:
        </h1>
        {renderGraph(data.gameState.mapState, viewportDimensions)}
      </div>
    </div>
  );
};

export default MapView;
