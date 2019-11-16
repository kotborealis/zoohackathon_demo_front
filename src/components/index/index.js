import React, {useState} from 'react';
import {useApi} from '../../hooks/useApi';
import ReactMapGL from 'react-map-gl';

export const Index = (props) => {
    const {data} = useApi(['/adduser']);
    const [mapState, setMapState] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    return (<div>
        <ReactMapGL
            {...mapState}
            mapboxApiAccessToken={process.env.MAPBOX_API_TOKEN}
            onViewportChange={setMapState}
        />
    </div>);
};