/**
 * SettingsModal
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './SettingsModal.styles';
import Modal from 'react-modal';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import AlertSettingsPanel from './AlertSettingsPanel';
import ObjectiveSettingsPanel from './ObjectiveSettingsPanel';
import ResourceSettingsPanel from './ResourceSettingsPanel';
import TagSettingsPanel from './TagSettingsPanel';
import NoteSettingsPanel from './NoteSettingsPanel';
import ActionSettingsPanel from './ActionSettingsPanel';
import PlayerSettingsPanel from './PlayerSettingsPanel';
import LocationSettingsPanel from './LocationSettingsPanel';
import InfectionCardSettingsPanel from './InfectionCardSettingsPanel';
import PlayerCardSettingsPanel from './PlayerCardSettingsPanel';
import './SettingsModal.css';

export interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

Modal.setAppElement('#root');
const SettingsModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel='Settings'
    >
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1>SettingsModal</h1>
        <button onClick={props.closeModal}>close modal</button>
        <Tabs>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              minHeight: '700',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                borderStyle: 'solid',
                margin: 5,
                padding: 5,
                flexDirection: 'column',
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              Tabs
              <TabList>
                <Tab>Alerts</Tab>
                <Tab>Objectives</Tab>
                <Tab>Resources</Tab>
                <Tab>Tags</Tab>
                <Tab>Notes</Tab>
                <Tab>Actions</Tab>
                <Tab>Players</Tab>
                <Tab>Locations</Tab>
                <Tab>Infection Cards</Tab>
                <Tab>Player Cards</Tab>
              </TabList>
            </div>
            <div
              style={{
                flex: 3,
                borderStyle: 'solid',
                margin: 5,
                padding: 5,
                flexDirection: 'column',
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              Settings
              <TabPanel>
                <AlertSettingsPanel />
              </TabPanel>
              <TabPanel>
                <ObjectiveSettingsPanel />
              </TabPanel>
              <TabPanel>
                <ResourceSettingsPanel />
              </TabPanel>
              <TabPanel>
                <TagSettingsPanel />
              </TabPanel>
              <TabPanel>
                <NoteSettingsPanel />
              </TabPanel>
              <TabPanel>
                <ActionSettingsPanel />
              </TabPanel>
              <TabPanel>
                <PlayerSettingsPanel />
              </TabPanel>
              <TabPanel>
                <LocationSettingsPanel />
              </TabPanel>
              <TabPanel>
                <InfectionCardSettingsPanel />
              </TabPanel>
              <TabPanel>
                <PlayerCardSettingsPanel />
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </Modal>
  );
};

export default SettingsModal;
