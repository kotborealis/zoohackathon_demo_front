import React from 'react';
import {Marker} from 'react-map-gl';
import style from './index.css';

export const MarkerShip = ({zoom, lat, lon, vesselName, suspicious = false, forceName = false}) =>
    <Marker
        latitude={lat * 1}
        longitude={lon * 1}
    >
        <div className={style.ship}>
            <div className={style.icon}>🚢</div>
            {(zoom > 14 || forceName === true) &&
             <div style={{color: suspicious ? "#ffe41d" : "white"}}>
                 {vesselName}
             </div>}
        </div>
    </Marker>;