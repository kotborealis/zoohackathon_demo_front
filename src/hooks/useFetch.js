import React, {useEffect, useState} from 'react';
import urljoin from 'url-join';

export const useFetch = (url, options) => {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const fetch_url = urljoin(...(Array.isArray(url) ? url : [url]));

    useEffect(() => {
        (async () => {
            const response = await fetch(fetch_url, options);
            setStatus(response.status);

            try{
                const json = await response.json();
                setData(json);
                if(json.error) setError(json.error);
            }
            catch(e){
                setError(e);
                setData(null);
            }

            setLoading(false);
        })();
    }, url);

    return {data, loading, error, status};
};