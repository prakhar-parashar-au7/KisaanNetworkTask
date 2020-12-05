import React from 'react';
import AddUsers from './addUsers';
import SentMessages from './sentMessages';

const HomePage = () => {

    return (
        <div style={{ display: 'grid', gridTemplateColumns: "400px auto", gridGap: "40px" }}>
            <p>Hii, please use the json files sent in the folder named dummy Json files to test. Use contact.json for list of contacts and sentMessages.json for list of sent messages</p>
            <AddUsers />
            <SentMessages />
        </div>
    )

}

export default HomePage