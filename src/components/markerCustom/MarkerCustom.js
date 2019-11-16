import React from 'react';
import {Marker} from 'react-map-gl';
import style from './index.css';

export const MarkerCustom = ({lat, lon, marker}) =>
    <Marker
        latitude={lat * 1}
        longitude={lon * 1}
    >
        <div className={style.marker}>
            <div className={marker.length <= 2 ? style.icon : ""}>{marker}</div>
        </div>
    </Marker>;