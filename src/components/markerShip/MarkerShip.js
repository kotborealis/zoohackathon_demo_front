import React from 'react';
import {Marker} from 'react-map-gl';
import style from './index.css';

export const MarkerShip = ({lat, lon, vesselName}) =>
    <Marker
        latitude={lat * 1}
        longitude={lon * 1}
    >
        <div className={style.ship}>
            <div className={style.icon}>🚢</div>
            {vesselName}
        </div>
    </Marker>;