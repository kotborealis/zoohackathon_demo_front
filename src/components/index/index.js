import React, {useState} from 'react';
import {useApi} from '../../hooks/useApi';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';
import styles from './index.css';

export const Index = (props) => {
    const {data} = useApi(['/adduser']);
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
        >
            <div style={{position: 'absolute', right: 0}}>
                <FullscreenControl container={document.querySelector('body')}/>
            </div>
        </ReactMapGL>
    </div>);
};