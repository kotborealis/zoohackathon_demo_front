import React, {useEffect, useRef, useState} from 'react';
import ReactMapGL, {FullscreenControl, HTMLOverlay, Marker} from 'react-map-gl';
import styles from './index.css';
import {MarkerShip} from '../markerShip/MarkerShip';
import {useApi} from '../../hooks/useApi';
import {useHotkeys} from 'react-hotkeys-hook';
import dataMarkers from './markers.json';

export const Index = (props) => {
    const [, updateState] = useState();

    const [shipsTracking, setShipsTracking] = useState({});
    const [shipTracksStep, setShipTracksStep] = useState(0);

    const [currentDate, setCurrentDate] = useState(new Date);
    const [prevDate, setPrevDate] = useState(new Date);

    useEffect(() => {
        setCurrentDate(date => {
            date.setYear(2017);
            date.setDate(30);
            date.setHours(21);
            date.setMinutes(1);
            date.setSeconds(0);
            date.setHours(date.getHours() + 10);
            return date;
        });
    }, []);

    useEffect(() => {
        setPrevDate(date => {
            date.setYear(2017);
            date.setDate(30);
            date.setHours(21);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setHours(date.getHours() + 10);
            return date;
        });
    }, []);

    const {data: shipsData} = useApi(`getShipsInRange?lonStart=-1000&lonEnd=1000&latStart=-1000&latEnd=1000&page=0&pageSize=1000000&dateStart=${Math.floor(prevDate.getTime())}&dateEnd=${Math.floor(currentDate.getTime())}`);

    useEffect(() => {
        if(!shipsData) return;
        setShipsTracking(ships => {
            shipsData.forEach((ship) => ships[ship.vesselName] = ship);
            return ships;
        });
    }, [currentDate.getTime()]);

    useHotkeys('n', () => {
        setCurrentDate(date_ => {
            const date = new Date(date_);
            date.setSeconds(date.getSeconds() + 1);
            return date;
        });
        setPrevDate(date_ => {
            const date = new Date(date_);
            date.setSeconds(date.getSeconds() + 1);
            return date;
        });
        setShipTracksStep(i => i + 1);
    });

    const [debug, setDebug] = useState(false);
    useHotkeys('d', () => {
        setDebug(debug => !debug);
    });

    const [mapState, setMapState] = useState({
        width: '100%',
        height: '100%',
        latitude: 59.50424261907552,
        longitude: -151.4376,
        zoom: 8
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
            updateState(Math.random());
        }
        else if(enableShipCreation){
            if(!shipsCustomTracks.current[shipTracksStep])
                shipsCustomTracks.current[shipTracksStep] = [];

            shipsCustomTracks.current[shipTracksStep].push({
                longitude, latitude, name: currentShipName
            });
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
                    style={{color: "black", background: "white", padding: "5px", width: "300px", height: "300px"}}>
                    <b>Markers</b>
                    <input type="checkbox" checked={enableMarkerCreation}
                           onChange={({target: {checked}}) => setEnableMarkerCreation(checked)}/>
                    <br/>
                    Current marker: <br/>
                    <input type={"text"} value={currentMarker}
                           onChange={({target: {value}}) => setCurrentMarker(value)}/>
                    <b>Ship creation</b>
                    <input type="checkbox" checked={enableShipCreation}
                           onChange={({target: {checked}}) => setEnableShipCreation(checked)}/>
                    <br/>
                    Ship name: <br/>
                    <input type={"text"} value={currentShipName}
                           onChange={({target: {value}}) => setCurrentShipName(value)}/>
                </div>}
            />}
        </ReactMapGL>
    </div>);
};