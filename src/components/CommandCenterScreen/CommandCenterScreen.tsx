/**
 * CommandCenterScreen
 */

import * as React from 'react';
import { useState } from 'react';

// eslint-disable-next-line
import styles from './CommandCenterScreen.styles';
import CommandCenterHeaderView from './CommandCenterHeaderView';
import CommandCenterBodyView from './CommandCenterBodyView';
import CommandCenterFooterView from './CommandCenterFooterView';
import InfectionDeckModal from './InfectionDeckModal';
import PlayersModal from './PlayersModal';
import PlayerDeckModal from './PlayerDeckModal';

export interface Props {}

export enum ModalName {
  PLAYERS_MODAL,
  PLAYER_DECK_MODAL,
  INFECTION_DECK_MODAL,
  NONE,
}

const CommandCenterScreen: React.FC<Props> = (props: Props) => {
  const [modalStates, setModalStates] = useState({
    players: false,
    playerDeck: false,
    infectionDeck: false,
  });

  const setActiveModal = (activeModal: ModalName) => {
    switch (activeModal) {
      case ModalName.PLAYERS_MODAL:
        return setModalStates({
          players: true,
          playerDeck: false,
          infectionDeck: false,
        });
      case ModalName.PLAYER_DECK_MODAL:
        return setModalStates({
          players: false,
          playerDeck: true,
          infectionDeck: false,
        });
      case ModalName.INFECTION_DECK_MODAL:
        return setModalStates({
          players: false,
          playerDeck: false,
          infectionDeck: true,
        });
    }
  };

  const dismissActiveModal = () => {
    return setModalStates({
      players: false,
      playerDeck: false,
      infectionDeck: false,
    });
  };

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
      <CommandCenterFooterView setActiveModal={setActiveModal} />

      <InfectionDeckModal
        isOpen={modalStates.infectionDeck}
        closeModal={dismissActiveModal}
      />
      <PlayersModal
        isOpen={modalStates.players}
        closeModal={dismissActiveModal}
      />
      <PlayerDeckModal
        isOpen={modalStates.playerDeck}
        closeModal={dismissActiveModal}
      />
    </div>
  );
};

export default CommandCenterScreen;
