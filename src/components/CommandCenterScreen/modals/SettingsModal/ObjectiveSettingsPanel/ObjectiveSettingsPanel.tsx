/**
 * ObjectiveSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ObjectiveSettingsPanel.styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_OBJECTIVES,
  UPDATE_OBJECTIVE,
  CREATE_OBJECTIVE,
  DELETE_OBJECTIVE,
} from '../../../views/ObjectivesView/ObjectivesView.requests';
import { oc } from 'ts-optchain';
import { Objective } from '../../../../../graphql/types';
import { useState } from 'react';
import { useEffect } from 'react';

export interface Props {}

const ObjectiveItem = ({ objective }: { objective: Objective }) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [objectiveData, setObjectiveData] = useState({
    __typename: 'Objective',
    description: objective.description,
    isMandatory: objective.isMandatory,
    isComplete: objective.isComplete,
  });
  useEffect(() => {
    setObjectiveData(objectiveData => ({
      ...objectiveData,
      description: objective.description,
      isMandatory: objective.isMandatory,
      isComplete: objective.isComplete,
    }));
  }, [objective]);

  const [updateObjective] = useMutation(UPDATE_OBJECTIVE, {
    refetchQueries: () => ['GET_OBJECTIVES'],
  });
  const [deleteObjective] = useMutation(DELETE_OBJECTIVE, {
    refetchQueries: () => ['GET_OBJECTIVES'],
  });
  const renderEditableObjective = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <input
          style={{ flex: 3 }}
          type={'text'}
          value={objectiveData.description}
          onChange={e => {
            setObjectiveData({
              ...objectiveData,
              description: e.target.value,
            });
          }}
        />
        <div style={{ flex: 1 }}>
          Is Mandatory?
          <input
            type={'checkbox'}
            checked={!!objectiveData.isMandatory}
            onChange={e => {
              setObjectiveData({
                ...objectiveData,
                isMandatory: e.target.checked,
              });
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          Is Complete?
          <input
            type={'checkbox'}
            checked={!!objectiveData.isComplete}
            onChange={e => {
              setObjectiveData({
                ...objectiveData,
                isComplete: e.target.checked,
              });
            }}
          />
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            updateObjective({
              variables: { id: objective.id, data: objectiveData },
            });
            setInEditMode(false);
          }}
        >
          Save
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            deleteObjective({
              variables: { id: objective.id },
            });
            setInEditMode(false);
          }}
        >
          Delete
        </div>
      </div>
    );
  };
  const renderReadOnlyObjective = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 3 }}>{`${objective.description}`}</div>
        <div style={{ flex: 1 }}>
          {`${objective.isMandatory ? 'Mandatory' : 'Optional'}`}
        </div>
        <div style={{ flex: 1 }}>
          {`${objective.isComplete ? 'Completed' : 'Not Completed'}`}
        </div>
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
  return inEditMode ? renderEditableObjective() : renderReadOnlyObjective();
};

const ObjectiveSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_OBJECTIVES, {
    fetchPolicy: 'no-cache',
  });
  const [createObjective] = useMutation(CREATE_OBJECTIVE, {
    refetchQueries: () => ['GET_OBJECTIVES'],
  });
  const objectives = oc(data).gameState.boardState.objectives([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>ObjectiveSettingsPanel</h1>
      <h2 style={{ paddingLeft: 20 }}>Objectives:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {objectives.map((objective: Objective) => (
          <ObjectiveItem objective={objective} key={objective.id} />
        ))}
        <div
          onClick={() => {
            createObjective();
          }}
        >
          Create New Objective
        </div>
      </div>
    </div>
  );
};

export default ObjectiveSettingsPanel;
