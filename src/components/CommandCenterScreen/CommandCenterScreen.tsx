/**
 * CommandCenterScreen
 */

import * as React from 'react';
import { useState } from 'react';

// eslint-disable-next-line
import styles from './CommandCenterScreen.styles';
import InfectionDeckModal from './modals/InfectionDeckModal';
import PlayerDeckModal from './modals/PlayerDeckModal';
import SettingsModal from './modals/SettingsModal';
import TraitsView from './views/TraitsView';
import MapView from './views/MapView';
import DetailView from './views/DetailView';
import InfectionDeckView from './views/InfectionDeckView';
import PlayersView from './views/PlayersView';
import PlayerDeckView from './views/PlayerDeckView';
import ObjectivesView from './views/ObjectivesView';
import InfoPanelView from './views/InfoPanelView';
import NotesView from './views/NotesView';

export interface Props {}

export enum ModalName {
  PLAYER_DECK_MODAL,
  INFECTION_DECK_MODAL,
  SETTINGS_MODAL,
  NONE,
}

const CommandCenterScreen: React.FC<Props> = (props: Props) => {
  const [modalStates, setModalStates] = useState({
    playerDeck: false,
    // playerDeck: true,
    infectionDeck: false,
    // infectionDeck: true,
    settings: false,
    // settings: true,
  });

  const [selectedItem, setSelectedItem] = useState({});

  const setActiveModal = (activeModal: ModalName) => {
    switch (activeModal) {
      case ModalName.PLAYER_DECK_MODAL:
        return setModalStates({
          playerDeck: true,
          infectionDeck: false,
          settings: false,
        });
      case ModalName.INFECTION_DECK_MODAL:
        return setModalStates({
          playerDeck: false,
          infectionDeck: true,
          settings: false,
        });
      case ModalName.SETTINGS_MODAL:
        return setModalStates({
          playerDeck: false,
          infectionDeck: false,
          settings: true,
        });
    }
  };

  const dismissActiveModal = () => {
    return setModalStates({
      playerDeck: false,
      infectionDeck: false,
      settings: false,
    });
  };

  const openSettingsModal = () => setActiveModal(ModalName.SETTINGS_MODAL);
  const openInfectionDeckModal = () =>
    setActiveModal(ModalName.INFECTION_DECK_MODAL);
  const openPlayerDeckModal = () => setActiveModal(ModalName.PLAYER_DECK_MODAL);

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
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        <h2>Pandemic Companion</h2>
        <button onClick={openSettingsModal}>open modal</button>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <ObjectivesView />
        <InfoPanelView />
        <NotesView />
      </div>
      <div style={{ flex: 2, display: 'flex', overflow: 'hidden' }}>
        <TraitsView />
        <MapView
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <DetailView selectedItem={selectedItem} />
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <InfectionDeckView openModal={openInfectionDeckModal} />
        <PlayersView setSelectedItem={setSelectedItem} />
        <PlayerDeckView openModal={openPlayerDeckModal} />
      </div>

      <InfectionDeckModal
        isOpen={modalStates.infectionDeck}
        closeModal={dismissActiveModal}
      />

      <PlayerDeckModal
        isOpen={modalStates.playerDeck}
        closeModal={dismissActiveModal}
      />
      <SettingsModal
        isOpen={modalStates.settings}
        closeModal={dismissActiveModal}
      />
    </div>
  );
};

export default CommandCenterScreen;
