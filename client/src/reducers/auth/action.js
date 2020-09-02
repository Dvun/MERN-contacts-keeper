import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL  = 'REGISTER_FAIL'
export const USER_LOADED = 'USER_LOADED'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'


// Load User
export const loadUser = () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    return async dispatch => {
        try {
            const res = await axios.get('/api/auth')
            dispatch({type: USER_LOADED, payload: res.data})
        } catch (e) {
            dispatch({type: AUTH_ERROR, payload: e.response.data.message})
        }
    }
}

// Authorization User
export const registerUser = (formData) => {
    return async dispatch => {
        const config = {
            headers: {'Content-type': 'application/json'}
        }
        try {
            const res = await axios.post('/api/auth/register', formData, config)
            await dispatch({type: REGISTER_SUCCESS, payload: res.data})
            await dispatch(loadUser())
        } catch (e) {
            await dispatch({type: REGISTER_FAIL})
        }
    }
}

// Login User
export const loginUser = (formData) => {
    return async dispatch => {
        const config = {
            headers: {'Content-type': 'application/json'}
        }
        try {
            const res = await axios.post('/api/auth/login', formData, config)
            await dispatch({type: LOGIN_SUCCESS, payload: res.data})
            await dispatch(loadUser())
        } catch (err) {
            await dispatch({type: LOGIN_FAIL, payload: err.response.data.message})
        }
    }
}

// Logout
export const logoutUser = () => (
    {type: LOGOUT}
)

// Clear Errors
export const clearErrors = () => (
    {type: CLEAR_ERRORS}
    )