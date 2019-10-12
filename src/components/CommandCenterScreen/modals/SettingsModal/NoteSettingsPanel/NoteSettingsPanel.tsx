/**
 * NoteSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './NoteSettingsPanel.styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from '../../../views/NotesView/NotesView.requests';
import { oc } from 'ts-optchain';
import { Note } from '../../../../../graphql/types';

export interface Props {}

const NoteSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_NOTES);
  const notes = oc(data).gameState.boardState.notes([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>NoteSettingsPanel</h1>
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
  );
};

export default NoteSettingsPanel;
