/**
 * InfectionDeckModal
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './InfectionDeckModal.styles';
import Modal from 'react-modal';

export interface Props {
  closeModal: () => void;
  isOpen: boolean;
}

const InfectionDeckModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel='Players'
    >
      <div>
        <h1>InfectionDeckModal</h1>
        <button onClick={props.closeModal}>close modal</button>
      </div>
    </Modal>
  );
};

export default InfectionDeckModal;
