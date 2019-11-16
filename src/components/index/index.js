import React, {useEffect, useState} from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';
import styles from './index.css';
import {MarkerShip} from '../markerShip/MarkerShip';
import {useApi} from '../../hooks/useApi';
import {useHotkeys} from 'react-hotkeys-hook';

export const Index = (props) => {
    const [shipsTracking, setShipsTracking] = useState({});

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
    });

    const [mapState, setMapState] = useState({
        width: '100%',
        height: '100%',
        latitude: 59.50424261907552,
        longitude: -151.4376,
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
            {Object.keys(shipsTracking).map((key) => (
                <MarkerShip {...shipsTracking[key]}/>
            ))}
        </ReactMapGL>
    </div>);
};