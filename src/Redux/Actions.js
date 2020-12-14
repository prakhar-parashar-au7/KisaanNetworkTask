import axios from 'axios'

export const recievedUsersInfo = (users) => {
    // axios({
    //     method: "post",
    //     url: "http://localhost:1111/saveUsers",
    //     data: {
    //         users: users
    //     }
    // })
    console.log(users);
    return {
        type: "RECIEVED_USERS",
        payload: {
            users
        }
    }
}

export const addNewUser = (newUser) => {
    console.log("newUserAction")
    return {
        type: "NEW_USER",
        payload: {
            newUser
        }
    }
}




export const sentMessagesAction = (sentMessage) => {
    return {
        type: "SENT_MESSAGE",
        payload: {
            sentMessage
        }
    }
}