/**
 * MapView
 */

import * as React from 'react';
// eslint-disable-next-line
import { Graph } from 'react-d3-graph';

// eslint-disable-next-line
import styles from './MapView.styles';

export interface Props {}

const renderGraph = () => {
  // graph payload (with minimalist structure)
  const data = {
    nodes: [
      { id: 'Harry', color: 'blue' },
      { id: 'Sally', color: 'yellow' },
      { id: 'Alice', color: 'black' },
    ],
    links: [
      { source: 'Harry', target: 'Sally' },
      { source: 'Harry', target: 'Alice' },
    ],
  };

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      fontColor: 'white',
      color: 'white',
      size: 120,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
  };

  // graph event callbacks
  const onClickGraph = function() {
    // window.alert(`Clicked the graph background`);
  };

  const onClickNode = function(nodeId: any) {
    // window.alert(`Clicked node ${nodeId}`);
  };

  // const onDoubleClickNode = function(nodeId: any) {
  //   // window.alert(`Double clicked node ${nodeId}`);
  // };

  const onRightClickNode = function(event: any, nodeId: any) {
    // window.alert(`Right clicked node ${nodeId}`);
  };

  const onMouseOverNode = function(nodeId: any) {
    // window.alert(`Mouse over node ${nodeId}`);
  };

  const onMouseOutNode = function(nodeId: any) {
    // window.alert(`Mouse out node ${nodeId}`);
  };

  const onClickLink = function(source: any, target: any) {
    // window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onRightClickLink = function(event: any, source: any, target: any) {
    // window.alert(`Right clicked link between ${source} and ${target}`);
  };

  const onMouseOverLink = function(source: any, target: any) {
    // window.alert(`Mouse over in link between ${source} and ${target}`);
  };

  const onMouseOutLink = function(source: any, target: any) {
    // window.alert(`Mouse out link between ${source} and ${target}`);
  };

  const onNodePositionChange = function(nodeId: any, x: any, y: any) {
    // window.alert(
    //   `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
    // );
  };

  return (
    <Graph
      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onRightClickNode={onRightClickNode}
      onClickGraph={onClickGraph}
      onClickLink={onClickLink}
      onRightClickLink={onRightClickLink}
      onMouseOverNode={onMouseOverNode}
      onMouseOutNode={onMouseOutNode}
      onMouseOverLink={onMouseOverLink}
      onMouseOutLink={onMouseOutLink}
      onNodePositionChange={onNodePositionChange}
    />
  );
};

const MapView: React.FC = (props: Props) => {
  return (
    <div
      style={{
        flex: 2.5,
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
        <h1 style={{ textAlign: 'center' }}>Map:</h1>
        {renderGraph()}
      </div>
    </div>
  );
};

export default MapView;
