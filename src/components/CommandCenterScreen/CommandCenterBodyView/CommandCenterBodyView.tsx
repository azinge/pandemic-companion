/**
 * CommandCenterBodyView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './CommandCenterBodyView.styles';
import ActionsView from './ActionsView';
import MapView from './MapView';
import TraitsView from './TraitsView';

export interface Props {}

const CommandCenterBodyView: React.FC = (props: Props) => {
  return (
    <div
      style={{
        flex: 2,
        display: 'flex',
      }}
    >
      <ActionsView />
      <MapView />
      <TraitsView />
    </div>
  );
};

export default CommandCenterBodyView;
