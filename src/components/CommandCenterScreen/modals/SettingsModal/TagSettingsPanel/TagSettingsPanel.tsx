/**
 * TagSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './TagSettingsPanel.styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_GENERAL_INFO,
  UPDATE_GLOBAL_TAG,
  DELETE_GLOBAL_TAG,
  CREATE_GLOBAL_TAG,
} from '../../../views/InfoPanelView/InfoPanelView.requests';
import { oc } from 'ts-optchain';
import { Tag } from '../../../../../graphql/types';

export interface Props {}

const TagItem = ({ tag }: { tag: Tag }) => {
  const [inEditMode, setInEditMode] = React.useState(false);
  const [tagData, setTagData] = React.useState({
    __typename: 'Tag',
    name: tag.name,
    description: tag.description,
  });
  React.useEffect(() => {
    setTagData(tagData => ({
      ...tagData,
      name: tag.name,
      description: tag.description,
    }));
  }, [tag]);

  const [updateTag] = useMutation(UPDATE_GLOBAL_TAG, {
    refetchQueries: () => ['GET_GENERAL_INFO'],
  });
  const [deleteTag] = useMutation(DELETE_GLOBAL_TAG, {
    refetchQueries: () => ['GET_GENERAL_INFO'],
  });
  const renderEditableTag = () => {
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
          value={tagData.name}
          onChange={e => {
            setTagData({
              ...tagData,
              name: e.target.value,
            });
          }}
        />
        <input
          style={{ flex: 2 }}
          type={'text'}
          value={tagData.description}
          onChange={e => {
            setTagData({
              ...tagData,
              description: e.target.value,
            });
          }}
        />
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            updateTag({
              variables: { id: tag.id, data: tagData },
            });
            setInEditMode(false);
          }}
        >
          Save
        </div>
        <div
          style={{ flex: 0.5 }}
          onClick={() => {
            deleteTag({
              variables: { id: tag.id },
            });
            setInEditMode(false);
          }}
        >
          Delete
        </div>
      </div>
    );
  };
  const renderReadOnlyTag = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 2 }}>{`${tag.name}`}</div>
        <div style={{ flex: 2 }}>{`${tag.description}`}</div>
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
  return inEditMode ? renderEditableTag() : renderReadOnlyTag();
};

const TagSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_INFO, {
    fetchPolicy: 'no-cache',
  });
  const [createTag] = useMutation(CREATE_GLOBAL_TAG, {
    refetchQueries: () => ['GET_GENERAL_INFO'],
  });
  const tags = oc(data).gameState.boardState.tags([]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! :(</div>;
  return (
    <div>
      <h1>TagSettingsPanel</h1>
      <h2 style={{ textAlign: 'center', fontSize: 15 }}>Tags:</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <div>
          {tags.map((tag: Tag) => (
            <TagItem tag={tag} key={tag.id} />
          ))}
          <div
            onClick={() => {
              createTag();
            }}
          >
            Create New Tag
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSettingsPanel;
