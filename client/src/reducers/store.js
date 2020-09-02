import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {contactReducer, authReducer, alertReducer} from './index'

const reducers = combineReducers({
    contactReducer,
    authReducer,
    alertReducer
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))