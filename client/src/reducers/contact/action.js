import axios from 'axios'
export const ADD_CONTACT = 'ADD_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const SET_CURRENT = 'SET_CURRENT'
export const CLEAR_CURRENT = 'CLEAR_CURRENT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const FILTER_CONTACTS = 'FILTER_CONTACTS'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const CONTACT_ERROR = 'CONTACT_ERROR'
export const GET_CONTACTS = 'GET_CONTACTS'
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS'


// Get all contacts by user
export const getContacts = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/contacts')
            await dispatch({type: GET_CONTACTS, payload: res.data})
        } catch (e) {
            await dispatch({type: CONTACT_ERROR, payload: e.response.data.message})
        }
    }
}

// Add contact
export const addContact = (contact) => {
    const config = {headers: {'Content-Type': 'application/json'}}
    return async dispatch => {
        const res = await axios.post('/api/contacts', contact, config)
        try {
            await dispatch({type: ADD_CONTACT, payload: res.data})
        } catch (e) {
            await dispatch({type: CONTACT_ERROR, payload: e.response.data.message})
        }
    }
}

// Delete contact
export const deleteContact = (id) => {
    return async dispatch => {
        await axios.delete(`/api/contacts/${id}`)
        try {
            await dispatch({type: DELETE_CONTACT, payload: id})
        } catch (e) {
            await dispatch({type: CONTACT_ERROR, payload: e.response.data.message})
        }
    }
}

// Update contact
export const updateCurrent = (contact) => {
    const config = {headers: {'Content-Type': 'application/json'}}
    return async dispatch => {
        const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
        try {
            await dispatch({type: UPDATE_CONTACT, payload: res.data})
        } catch (e) {
            await dispatch({type: CONTACT_ERROR, payload: e.response.data.message})
        }
    }
}

// Set current contact
export const setCurrent = (contact) => (
    {type: SET_CURRENT, payload: contact}
)

// Clear current contact
export const clearCurrent = () => ({type: CLEAR_CURRENT})

// Filter contacts
export const filterContacts = (text) => ({type: FILTER_CONTACTS, payload: text})

// Clear filter
export const clearFilter = () => ({type: CLEAR_FILTER})

// Clear all contacts if not logged
export const clearAllContacts = () => ({type: CLEAR_CONTACTS})