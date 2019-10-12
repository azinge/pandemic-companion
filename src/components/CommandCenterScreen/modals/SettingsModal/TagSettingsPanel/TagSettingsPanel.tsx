/**
 * TagSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './TagSettingsPanel.styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_GENERAL_INFO } from '../../../views/InfoPanelView/InfoPanelView.requests';
import { oc } from 'ts-optchain';
import { Tag } from '../../../../../graphql/types';

export interface Props {}

const TagSettingsPanel: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery(GET_GENERAL_INFO);
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
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div>
          {tags.map((tag: Tag) => (
            <div key={tag.id}>{`${tag.name}: ${tag.description}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSettingsPanel;
