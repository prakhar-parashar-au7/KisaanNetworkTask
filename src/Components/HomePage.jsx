import React from 'react';
import AddUsers from './addUsers';
import SentMessages from './sentMessages';

const HomePage = () => {

    return(
    <div style={{display: 'grid', gridTemplateColumns : "400px auto", gridGap : "40px"}}>
        <AddUsers/>
        <SentMessages/>
    </div>
    )

}

export default HomePage