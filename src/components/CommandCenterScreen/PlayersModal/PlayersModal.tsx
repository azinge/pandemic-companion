/**
 * PlayersModal
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayersModal.styles';
import Modal from 'react-modal';

export interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

const PlayersModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel='Players'
    >
      <div>
        <h1>PlayersModal</h1>
        <button onClick={props.closeModal}>close modal</button>
      </div>
    </Modal>
  );
};

export default PlayersModal;
