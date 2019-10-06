/**
 * CommandCenterFooterView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './CommandCenterFooterView.styles';
import PlayersView from './PlayersView';
import PlayerDeckView from './PlayerDeckView';
import InfectionDeckView from './InfectionDeckView';

export interface Props {}

const CommandCenterFooterView: React.FC = (props: Props) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <InfectionDeckView />
      <PlayersView />
      <PlayerDeckView />
    </div>
  );
};

export default CommandCenterFooterView;
