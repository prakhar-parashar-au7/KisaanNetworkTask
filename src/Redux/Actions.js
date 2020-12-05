export const recievedUsersInfo = (users) => {
    console.log(users);
    return {
        type: "RECIEVED_USERS",
        payload: {
            users
        }
    }
}

export const sentMessagesAction = (sentMessage) => {
    return {
        type : "SENT_MESSAGE",
        payload : {
            sentMessage
        }
    }
}