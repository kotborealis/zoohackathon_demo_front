import React, {useState} from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';
import styles from './index.css';
import {MarkerShip} from '../markerShip/MarkerShip';

export const Index = (props) => {
    //const {data} = useApi(['/adduser']);
    const {data: shipsData} = {
        data: [
            {
                MMSI: "367681000",
                BaseDateTime: "2017-12-01T00:12:59",
                LAT: 51.78481,
                LON: -178.16754,
                SOG: 7.9,
                COG: 137.1,
                Heading: 144.0,
                VesselName: "ALASKA TROJAN",
                IMO: "IMO7933646",
                CallSign: "WTS3158",
                VesselType: "1001",
                Status: undefined,
                Length: 28.75,
                Width: 9.15,
                Draft: undefined,
                Cargo: undefined,
            }
        ]
    };

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
            {shipsData.map((data) => (
                <MarkerShip {...data}/>
            ))}
        </ReactMapGL>
    </div>);
};