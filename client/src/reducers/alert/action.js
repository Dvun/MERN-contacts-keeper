import {v4 as uuid_v4} from "uuid"
export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

// Set alert
export const setAlert = (msg, type) => (
    {type: SET_ALERT, payload: {id: uuid_v4(), msg, type}}
)

// Remove alert
export const removeAlert = (alertId) => (
    {type: REMOVE_ALERT, payload: alertId}
)