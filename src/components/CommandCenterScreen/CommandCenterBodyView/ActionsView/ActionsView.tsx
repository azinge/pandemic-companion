/**
 * ActionsView
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './ActionsView.styles';

export interface Props {}

const ActionsView: React.FC = (props: Props) => {
  const actions: string[] = ['Drive / Ferry', 'Place Supply Cubes'];
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
        <h1 style={{ paddingLeft: 20 }}>Actions:</h1>
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
            {actions.map(action => (
              <div>{action}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsView;
