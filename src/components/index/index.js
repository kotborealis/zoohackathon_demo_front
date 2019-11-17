import React, {useEffect, useRef, useState} from 'react';
import ReactMapGL, {FullscreenControl, HTMLOverlay, Layer, Source} from 'react-map-gl';
import styles from './index.css';
import {MarkerShip} from '../markerShip/MarkerShip';
import {useApi} from '../../hooks/useApi';
import {useHotkeys} from 'react-hotkeys-hook';
import dataMarkers from './markers.json';
import {MarkerCustom} from '../markerCustom/MarkerCustom';
import {useFetch} from '../../hooks/useFetch';
import {heatmapLayer} from './heatmapLayer';

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

    const [_updateStateState, _updateState] = useState();
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

    const [enableHeatmap, setEnableHeatmap] = useState(false);
    useHotkeys('h', () => {
        setEnableHeatmap(a => !a);
    });

    const markers = useRef(dataMarkers);

    const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
    const [currentMarker, setCurrentMarker] = useState('🐟');

    useHotkeys('e', () => {
        console.log(JSON.stringify(markers.current));
    });

    const [enableShipCreation, setEnableShipCreation] = useState(false);
    const [currentShipName, setCurrentShipName] = useState('ПРЕЗИДЕНТ ЕЛЬЦИН');

    useEffect(() => {
        setShipsTracking(ships => {
            shipsApiData && shipsApiData.forEach((ship) => ships[ship.vesselName] = ship);
            markers.current.ships[shipTracksStep] &&
            markers.current.ships[shipTracksStep].forEach((ship) =>
                ships[ship.name] = {
                    lon: ship.longitude,
                    lat: ship.latitude,
                    vesselName: ship.name,
                    sog: ship.sog
                }
            );

            for(let lh_ of Object.keys(ships)){
                for(let rh_ of Object.keys(ships)){
                    if(lh_ === rh_) continue;
                    const lh = ships[lh_];
                    const rh = ships[rh_];
                    const dist = Math.sqrt((lh.lat - rh.lat) ** 2 + (lh.lon - rh.lon) ** 2);

                    ships[lh_].suspicious = dist < 1 || lh.sog === 0;
                    ships[rh_].suspicious = dist < 1 || rh.sog === 0;
                }
            }

            console.log(ships);
            return ships;
        });
    }, [shipTracksStep, _updateStateState]);

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

            setShipsTracking(ships => {
                ships[currentShipName] = {
                    lon: longitude,
                    lat: latitude,
                    vesselName: currentShipName
                };
                return ships;
            });

            forceUpdateState();
        }
    };

    const {data: heatmapData} = useFetch(['https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson']);

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
            {heatmapData && enableHeatmap && <Source type="geojson" data={heatmapData}>
                <Layer {...heatmapLayer}/>
            </Source>}
            {markers.current.custom.map(({longitude, latitude, marker}) =>
                <MarkerCustom lon={longitude} lat={latitude} marker={marker}/>
            )}
            {Object.keys(shipsTracking).map((key) => (
                <MarkerShip {...shipsTracking[key]}/>
            ))}
            {debug && debugOverlay}
        </ReactMapGL>
    </div>);
};