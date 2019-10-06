/**
 * CommandCenterHeaderView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './CommandCenterHeaderView.styles';
import ObjectivesView from './ObjectivesView';
import NotesView from './NotesView';
import InfoPanelView from './InfoPanelView';

export interface Props {}

const CommandCenterHeaderView: React.FC = (props: Props) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <ObjectivesView />
      <InfoPanelView />
      <NotesView />
    </div>
  );
};

export default CommandCenterHeaderView;
