/**
 * PlayerDeckModal
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './PlayerDeckModal.styles';
import Modal from 'react-modal';

export interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

const PlayerDeckModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel='Players'
    >
      <div>
        <h1>PlayerDeckModal</h1>
        <button onClick={props.closeModal}>close modal</button>
      </div>
    </Modal>
  );
};

export default PlayerDeckModal;
