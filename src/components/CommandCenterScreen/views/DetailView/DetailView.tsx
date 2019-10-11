/**
 * DetailView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './DetailView.styles';
import { oc } from 'ts-optchain';

export interface Props {
  selectedItem: any;
}

const DetailView: React.FC<Props> = (props: Props) => {
  const getSelectedDetailView = () => {
    const selectedItem = oc(props).selectedItem({});
    switch (selectedItem.__typename) {
      case 'Location':
        return (
          <div>
            {`Location - 
            ${oc(selectedItem)({}).name}`}
          </div>
        );
      case 'Route':
        return (
          <div>
            {`Route - 
            ${oc(selectedItem).start({}).name} -> ${
              oc(selectedItem).end({}).name
            }`}
          </div>
        );
      case 'Player':
        return (
          <div>
            {`Player - 
          ${oc(selectedItem)({}).name}`}
          </div>
        );
      case 'Default':
        return <div>Select an Item to see it's stats</div>;
    }
  };
  return (
    <div
      style={{
        flex: 1,
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
        <h1 style={{ paddingLeft: 20 }}>Detail:</h1>
        {getSelectedDetailView()}
      </div>
    </div>
  );
};

export default DetailView;
