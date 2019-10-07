/**
 * CommandCenterFooterView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './CommandCenterFooterView.styles';
import PlayersView from './PlayersView';
import PlayerDeckView from './PlayerDeckView';
import InfectionDeckView from './InfectionDeckView';
import { ModalName } from '../CommandCenterScreen';

export interface Props {
  setActiveModal: (activeModal: ModalName) => void;
}

const CommandCenterFooterView: React.FC<Props> = (props: Props) => {
  const openInfectionDeckModal = () =>
    props.setActiveModal(ModalName.INFECTION_DECK_MODAL);
  const openPlayersModal = () => props.setActiveModal(ModalName.PLAYERS_MODAL);
  const openPlayerDeckModal = () =>
    props.setActiveModal(ModalName.PLAYER_DECK_MODAL);
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <InfectionDeckView openModal={openInfectionDeckModal} />
      <PlayersView openModal={openPlayersModal} />
      <PlayerDeckView openModal={openPlayerDeckModal} />
    </div>
  );
};

export default CommandCenterFooterView;
