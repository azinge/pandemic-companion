/**
 * NotesView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './NotesView.styles';
import { Note } from '../../../../graphql/types';
import { GET_NOTES } from './NotesView.requests';
import { useQuery } from '@apollo/react-hooks';
import { oc } from 'ts-optchain';

export interface Props {}

const NotesView: React.FC = (props: Props) => {
  const { data, loading, error } = useQuery(GET_NOTES);
  const notes = oc(data).gameState.boardState.notes([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
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
          overflow: 'auto',
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
            {notes.map((note: Note) => (
              <div key={note.id}>{note.description}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesView;
