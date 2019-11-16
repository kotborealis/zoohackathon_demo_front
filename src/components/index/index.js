import React, {useEffect, useRef, useState} from 'react';
import ReactMapGL, {FullscreenControl, HTMLOverlay, Marker} from 'react-map-gl';
import styles from './index.css';
import {MarkerShip} from '../markerShip/MarkerShip';
import {useApi} from '../../hooks/useApi';
import {useHotkeys} from 'react-hotkeys-hook';
import dataMarkers from './markers.json';

const apiUrlBuilder = ({
                           lonStart = -1000, lonEnd = -1000,
                           latStart = -1000, latEnd = 1000,
                           page = 0, pageSize = 9999,
                           dateStart, dateEnd
                       }) =>
    `getShipsInRange` +
    `?lonStart=${lonStart}` +
    `&lonEnd=${lonEnd}` +
    `&latStart=${latStart}` + `
        &latEnd=${latEnd}` + `
        &page=${page}` + `
        &pageSize=${pageSize}` +
    `&dateStart=${dateStart}` +
    `&dateEnd=${dateEnd}`;

console.warn(`n - advance time by 1 min`);
console.warn(`~ - show debug`);

export const Index = (props) => {
    const [mapState, setMapState] = useState({
        width: '100%',
        height: '100%',
        latitude: 59.50424261907552,
        longitude: -151.4376,
        zoom: 1
    });

    const [, _updateState] = useState();
    const forceUpdateState = () => _updateState(Math.random());

    const [shipsTracking, setShipsTracking] = useState({});
    const [shipTracksStep, setShipTracksStep] = useState(0);

    const initialTimeRange = Date.UTC(2017, 11, 15, 0, 0, 0);

    const [timeRange, setTimeRange] = useState([
        initialTimeRange,
        initialTimeRange + 60 * 1000
    ]);

    const {data: shipsApiData} = useApi(apiUrlBuilder({
        dateStart: timeRange[0],
        dateEnd: timeRange[1]
    }));

    useEffect(() => {
        if(!shipsApiData) return;
        setShipsTracking(ships => {
            shipsApiData.forEach((ship) => ships[ship.vesselName] = ship);
            return ships;
        });
    }, [timeRange[0]]);

    useHotkeys('n, p', (event, {key}) => {
        const dir = key === 'n' ? 1 : -1;
        const s = 60 * 1000;

        setShipTracksStep(i => !i && dir < 0 ? 0 : i + dir);
        setTimeRange(([prev, cur]) =>
            (prev === initialTimeRange && dir < 0)
                ? [prev, cur]
                : [prev + s * dir, cur + s * dir]
        );
    });

    const [debug, setDebug] = useState(false);
    useHotkeys('`', () => {
        setDebug(debug => !debug);
    });

    const markers = useRef(dataMarkers);

    const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
    const [currentMarker, setCurrentMarker] = useState('🐟');

    useHotkeys('e', () => {
        console.log(JSON.stringify(markers.current));
    });

    const [enableShipCreation, setEnableShipCreation] = useState(false);
    const [currentShipName, setCurrentShipName] = useState('ПРЕЗИДЕНТ ЕЛЬЦИН');

    const onClickHandler = ({lngLat: [longitude, latitude]}) => {
        if(!debug) return;

        if(enableMarkerCreation){
            markers.current.custom = [...markers.current.custom, {
                longitude, latitude, marker: currentMarker
            }];
            forceUpdateState();

        }
        else if(enableShipCreation){
            console.log("Create ship", shipTracksStep, {
                longitude, latitude, name: currentShipName
            });
            if(!markers.current.ships[shipTracksStep])
                markers.current.ships[shipTracksStep] = [];

            markers.current.ships[shipTracksStep].push({
                longitude, latitude, name: currentShipName
            });
            forceUpdateState();
        }
    };

    const debugOverlay = (<HTMLOverlay
        redraw={() => <div
            style={{color: "black", background: "white", padding: "5px", width: "100%", height: "300px"}}>
            <div>
                <b>TimeRange:</b> {(new Date(timeRange[0])).toString()} — {(new Date(timeRange[1])).toString()}
            </div>
            <div>
                <b>TracksStep:</b> {shipTracksStep}
            </div>
            <div>
                <b>Markers: </b>
                <input type="checkbox" checked={enableMarkerCreation}
                       onChange={({target: {checked}}) => setEnableMarkerCreation(checked)}/>
                <input type={"text"} value={currentMarker}
                       onChange={({target: {value}}) => setCurrentMarker(value)}/>
            </div>
            <div>
                <b>Ship creation: </b>
                <input type="checkbox" checked={enableShipCreation}
                       onChange={({target: {checked}}) => setEnableShipCreation(checked)}/>
                <input type={"text"} value={currentShipName}
                       onChange={({target: {value}}) => setCurrentShipName(value)}/>
            </div>
        </div>}
    />);

    return (<div className={styles.container}>
        <ReactMapGL
            {...mapState}
            mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
            onViewportChange={setMapState}
            mapStyle="mapbox://styles/mapbox/dark-v8"
            onClick={onClickHandler}
        >
            <div style={{position: 'absolute', right: 0}}>
                <FullscreenControl container={document.querySelector('body')}/>
            </div>
            {markers.current.custom.map(({longitude, latitude, marker}) =>
                <Marker longitude={longitude} latitude={latitude}>{marker}</Marker>
            )}
            {Object.keys(shipsTracking).map((key) => (
                <MarkerShip {...shipsTracking[key]}/>
            ))}
            {markers.current.ships[shipTracksStep] &&
             markers.current.ships[shipTracksStep].map(({longitude, latitude, name}) =>
                 <MarkerShip lat={latitude} lon={longitude} vesselName={name}/>
             )}
            {debug && debugOverlay}
        </ReactMapGL>
    </div>);
};