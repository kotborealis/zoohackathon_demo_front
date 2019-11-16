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

export const Index = (props) => {
    const [mapState, setMapState] = useState({
        width: '100%',
        height: '100%',
        latitude: 59.50424261907552,
        longitude: -151.4376,
        zoom: 1
    });

    const [, _updateState] = useState();
    const updateState = () => _updateState(Math.random());

    const [shipsTracking, setShipsTracking] = useState({});
    const [shipTracksStep, setShipTracksStep] = useState(0);

    const [timeRange, setTimeRange] = useState([
        Date.UTC(2017, 11, 15, 0, 0, 0),
        Date.UTC(2017, 11, 15, 0, 1, 0)
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

    useHotkeys('n', () => {
        setTimeRange(([prev, cur]) => {
            return [prev + 60 * 1000, cur + 60 * 1000];
        });
        setShipTracksStep(i => i + 1);
    });

    const [debug, setDebug] = useState(false);
    useHotkeys('d', () => {
        setDebug(debug => !debug);
    });

    const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
    const [currentMarker, setCurrentMarker] = useState('🐟');
    const markers = useRef(dataMarkers);

    useHotkeys('e', () => {
        console.log(JSON.stringify(markers.current));
    });

    const [enableShipCreation, setEnableShipCreation] = useState(false);
    const [currentShipName, setCurrentShipName] = useState('ПРЕЗИДЕНТ ЕЛЬЦИН');
    const shipsCustomTracks = useRef([]);

    const onClickHandler = ({lngLat: [longitude, latitude]}) => {
        if(!debug) return;
        if(enableMarkerCreation){
            markers.current = [...markers.current, {
                longitude, latitude, marker: currentMarker
            }];
            updateState();
            return;
        }
        if(enableShipCreation){
            if(!shipsCustomTracks.current[shipTracksStep])
                shipsCustomTracks.current[shipTracksStep] = [];

            shipsCustomTracks.current[shipTracksStep].push({
                longitude, latitude, name: currentShipName
            });
            updateState();
        }
    };

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
            {Object.keys(shipsTracking).map((key) => (
                <MarkerShip {...shipsTracking[key]}/>
            ))}
            {markers.current.map(({longitude, latitude, marker}) =>
                <Marker longitude={longitude} latitude={latitude}>{marker}</Marker>
            )}
            {debug && <HTMLOverlay
                redraw={() => <div
                    style={{color: "black", background: "white", padding: "5px", width: "100%", height: "300px"}}>
                    <div>
                        <b>TimeRange:</b> {(new Date(timeRange[0])).toString()} — {(new Date(timeRange[1])).toString()}
                    </div>
                    <div>
                        <b>Markers: </b>
                        <input type="checkbox" checked={enableMarkerCreation}
                               onChange={({target: {checked}}) => setEnableMarkerCreation(checked)}/>
                        <input type={"text"} value={currentMarker}
                               onChange={({target: {value}}) => setCurrentMarker(value)}/>
                    </div>
                    <div>
                        <b>Ship creation</b>
                        <input type="checkbox" checked={enableShipCreation}
                               onChange={({target: {checked}}) => setEnableShipCreation(checked)}/>
                        <br/>
                        Ship name: <br/>
                        <input type={"text"} value={currentShipName}
                               onChange={({target: {value}}) => setCurrentShipName(value)}/>
                    </div>
                </div>}
            />}
        </ReactMapGL>
    </div>);
};