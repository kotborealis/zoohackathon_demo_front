import React from 'react';
import {Marker} from 'react-map-gl';
import style from './index.css';

export const MarkerShip = ({LAT, LON}) =>
    <Marker
        latitude={LAT}
        longitude={LON}
    >
        <div className={style.ship}>
            <img
                src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojione/211/ship_1f6a2.png"}/>
        </div>
    </Marker>;