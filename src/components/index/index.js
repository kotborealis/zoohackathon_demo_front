import {useApi} from '../../hooks/useApi';

import React from 'react';

export const Index = (props) => {
    const {data} = useApi(['/adduser']);

    return (<div>
        {data}
    </div>);
};