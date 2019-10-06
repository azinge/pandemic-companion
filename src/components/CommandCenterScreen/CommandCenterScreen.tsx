/**
 * CommandCenterScreen
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './CommandCenterScreen.styles';
import CommandCenterHeaderView from './CommandCenterHeaderView';
import CommandCenterBodyView from './CommandCenterBodyView';
import CommandCenterFooterView from './CommandCenterFooterView';

export interface Props {}

const CommandCenterScreen: React.FC = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontSize: '15px',
        color: 'white',
        flexDirection: 'column',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>Statistics Department - Command Center - Mission Control</h2>
      </div>
      <CommandCenterHeaderView />
      <CommandCenterBodyView />
      <CommandCenterFooterView />
    </div>
  );
};

export default CommandCenterScreen;
