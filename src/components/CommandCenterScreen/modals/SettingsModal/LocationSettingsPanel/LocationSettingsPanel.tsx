/**
 * LocationSettingsPanel
 */

import * as React from 'react';

// eslint-disable-next-line
import styles from './LocationSettingsPanel.styles';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Location, Route } from '../../../../../graphql/types';
import { oc } from 'ts-optchain';
import { GET_MAP_STATE_INFO } from './LocationSettingsPanel.requests';

export interface Props {}

const LocationSettingsPanel: React.FC<Props> = (props: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>({});
  const { data } = useQuery(GET_MAP_STATE_INFO);
  const locations: Location[] = oc(data).gameState.mapState.locations([]);
  const routes: Route[] = oc(data).gameState.mapState.routes([]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <h1>LocationSettingsPanel</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: 600,
        }}
      >
        <div
          style={{
            flex: 1,
            borderStyle: 'solid',
            margin: 5,
            padding: 5,
            flexDirection: 'column',
            display: 'flex',
            overflow: 'auto',
          }}
        >
          Locations
          {locations.map(location => {
            return (
              <div
                key={location.id}
                onClick={() => {
                  setSelectedLocation(location);
                }}
              >
                {location.name}
              </div>
            );
          })}
        </div>
        <div
          style={{
            flex: 3,
            borderStyle: 'solid',
            margin: 5,
            padding: 5,
            flexDirection: 'column',
            display: 'flex',
          }}
        >
          Location Edit Form
          {oc(selectedLocation).id(undefined) ? (
            <div>
              <div>{oc(selectedLocation).name('')}</div>
              <div>
                {routes
                  .filter(route => {
                    return (
                      oc(route).start.id(undefined) === selectedLocation.id ||
                      oc(route).end.id(undefined) === selectedLocation.id
                    );
                  })
                  .map(route => {
                    return (
                      <div key={oc(route).id('')}>{`${oc(route).start.name(
                        ''
                      )} <-> ${oc(route).end.name('')}`}</div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>Select a Location</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSettingsPanel;
