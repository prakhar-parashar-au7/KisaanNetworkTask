import { createStore, compose } from 'redux'

const initialState = {
    users: {},
    sentMessages : []
    
}


const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case ("RECIEVED_USERS"):
            console.log(action)
            return {
                ...state, users: action.payload.users
            }

        case ("SENT_MESSAGE"):
            return {
                ...state, sentMessages : [ action.payload.sentMessage,...state.sentMessages ]
            }

        default:
            return state

    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(userReducer, /* preloadedState, */ composeEnhancers());

export default store;