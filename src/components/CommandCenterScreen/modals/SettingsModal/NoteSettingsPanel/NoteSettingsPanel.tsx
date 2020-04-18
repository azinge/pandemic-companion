/**
 * NoteSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './NoteSettingsPanel.styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_NOTES,
  UPDATE_NOTE,
  DELETE_NOTE,
  CREATE_NOTE,
} from '../../../views/NotesView/NotesView.requests';
import { oc } from 'ts-optchain';
import { Note } from '../../../../../graphql/types';

export interface Props {}

const NoteItem = ({ note }: { note: Note }) => {
  const [inEditMode, setInEditMode] = React.useState(false);
  const [noteData, setNoteData] = React.useState({
    __typename: 'Note',
    description: note.description,
  });
  React.useEffect(() => {
    setNoteData(noteData => ({
      ...noteData,
      description: note.description,
    }));
  }, [note]);

  const [updateNote] = useMutation(UPDATE_NOTE, {
    refetchQueries: () => ['GET_NOTES'],
  });
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: () => ['GET_NOTES'],
  });
  const renderEditableNote = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <input
          style={{ flex: 4 }}
          type={'text'}
          value={noteData.description}
          onChange={e => {
            setNoteData({
              ...noteData,
              description: e.target.value,
            });
          }}
        />
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            updateNote({
              variables: { id: note.id, data: noteData },
            });
            setInEditMode(false);
          }}
        >
          Save
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            deleteNote({
              variables: { id: note.id },
            });
            setInEditMode(false);
          }}
        >
          Delete
        </div>
      </div>
    );
  };
  const renderReadOnlyNote = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 4 }}>{`${note.description}`}</div>
        <div
          style={{ flex: 1 }}
          onClick={() => {
            setInEditMode(true);
          }}
        >
          Edit
        </div>
      </div>
    );
  };
  return inEditMode ? renderEditableNote() : renderReadOnlyNote();
};

const NoteSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_NOTES, {
    fetchPolicy: 'no-cache',
  });
  const [createNote] = useMutation(CREATE_NOTE, {
    refetchQueries: () => ['GET_NOTES'],
  });
  const notes = oc(data).gameState.boardState.notes([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>NoteSettingsPanel</h1>
      <h2 style={{ paddingLeft: 20 }}>Notes:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {notes.map((note: Note) => (
          <NoteItem note={note} key={note.id} />
        ))}
        <div
          onClick={() => {
            createNote();
          }}
        >
          Create New Note
        </div>
      </div>
    </div>
  );
};

export default NoteSettingsPanel;
