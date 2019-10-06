/**
 * NotesView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './NotesView.styles';

export interface Props {}

const NotesView: React.FC = (props: Props) => {
  const notes: string[] = [
    'Saksham is still not here :(',
    'Add a timer lol',
    'Add a randomizer',
  ];
  return (
    <div
      style={{
        flex: 1,
        padding: 10,
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: 1,
          borderColor: 'white',
          borderWidth: 10,
          borderStyle: 'solid',
          borderRadius: 10,
        }}
      >
        <h1 style={{ paddingLeft: 20 }}>Notes:</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <div>
            {notes.map(note => (
              <div>{note}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesView;
