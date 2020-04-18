/**
 * ActionSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ActionSettingsPanel.styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_GENERAL_ACTIONS,
  UPDATE_GLOBAL_ACTION,
  DELETE_GLOBAL_ACTION,
  CREATE_GLOBAL_ACTION,
} from '../../../views/TraitsView/TraitsView.requests';
import { oc } from 'ts-optchain';
import { Trait } from '../../../../../graphql/types';

export interface Props {}

const ActionItem = ({ action }: { action: Trait }) => {
  const [inEditMode, setInEditMode] = React.useState(false);
  const [actionData, setActionData] = React.useState({
    __typename: 'Action',
    name: action.name,
    description: action.description,
  });
  React.useEffect(() => {
    setActionData(actionData => ({
      ...actionData,
      name: action.name,
      description: action.description,
    }));
  }, [action]);

  const [updateAction] = useMutation(UPDATE_GLOBAL_ACTION, {
    refetchQueries: () => ['GET_GENERAL_ACTIONS'],
  });
  const [deleteAction] = useMutation(DELETE_GLOBAL_ACTION, {
    refetchQueries: () => ['GET_GENERAL_ACTIONS'],
  });
  const renderEditableAction = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <input
          style={{ flex: 2 }}
          type={'text'}
          value={actionData.name}
          onChange={e => {
            setActionData({
              ...actionData,
              name: e.target.value,
            });
          }}
        />
        <input
          style={{ flex: 2 }}
          type={'text'}
          value={actionData.description}
          onChange={e => {
            setActionData({
              ...actionData,
              description: e.target.value,
            });
          }}
        />
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            updateAction({
              variables: { id: action.id, data: actionData },
            });
            setInEditMode(false);
          }}
        >
          Save
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            deleteAction({
              variables: { id: action.id },
            });
            setInEditMode(false);
          }}
        >
          Delete
        </div>
      </div>
    );
  };
  const renderReadOnlyAction = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 2 }}>{`${action.name}`}</div>
        <div style={{ flex: 2 }}>{`${action.description}`}</div>
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
  return inEditMode ? renderEditableAction() : renderReadOnlyAction();
};

const ActionSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_ACTIONS, {
    fetchPolicy: 'no-cache',
  });
  const [createAction] = useMutation(CREATE_GLOBAL_ACTION, {
    refetchQueries: () => ['GET_GENERAL_ACTIONS'],
  });
  const actions = oc(data).gameState.actions([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>ActionSettingsPanel</h1>
      <h2 style={{ paddingLeft: 20 }}>Actions:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {actions.map((action: Trait) => (
          <ActionItem action={action} key={action.id} />
        ))}
        <div
          onClick={() => {
            createAction();
          }}
        >
          Create New Action
        </div>
      </div>
    </div>
  );
};

export default ActionSettingsPanel;
