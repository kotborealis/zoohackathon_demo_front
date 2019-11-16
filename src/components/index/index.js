import React, {useState} from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';
import styles from './index.css';
import {MarkerShip} from '../markerShip/MarkerShip';
import {useApi} from '../../hooks/useApi';
import {useHotkeys} from 'react-hotkeys-hook';

export const Index = (props) => {
    const [index, setIndex] = useState(0);
    const {data: shipsData} = useApi(['/test']);

    useHotkeys('n', () => setIndex(sliceIndex => sliceIndex + 1));

    const [mapState, setMapState] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    return (<div className={styles.container}>
        <ReactMapGL
            {...mapState}
            mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
            onViewportChange={setMapState}
            mapStyle="mapbox://styles/mapbox/dark-v8"
        >
            <div style={{position: 'absolute', right: 0}}>
                <FullscreenControl container={document.querySelector('body')}/>
            </div>
            {shipsData && [shipsData[index]].map((data) => (
                <MarkerShip {...data}/>
            ))}
        </ReactMapGL>
    </div>);
};