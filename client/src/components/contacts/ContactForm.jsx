import React, {useEffect, useState} from 'react';
import {addContact, getContacts, updateCurrent} from "../../reducers/contact/action";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrent} from "../../reducers/contact/action";

const ContactForm = () => {
    const dispatch = useDispatch()
    const {current} = useSelector(({contactReducer}) => contactReducer)
    const [contact, setContact] = useState({name: '', email: '', phone: '', type: 'personal'})
    const {name, email, phone, type} = contact

    useEffect(() => {
        if (current !== null) {
            setContact(current)
        }
    }, [setContact, current])

    const onchange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value})
    }

    const onsubmit = (e) => {
        e.preventDefault()
        if (current === null) {
            dispatch(addContact(contact))
        } else {
            dispatch(updateCurrent(contact))
        }
        dispatch(getContacts())
        dispatch(clearCurrent())
        setContact({name: '', email: '', phone: '', type: 'personal'})
    }

    const clearAll = () => {
        dispatch(clearCurrent())
        setContact({name: '', email: '', phone: '', type: 'personal'})
    }

    return (
        <form onSubmit={onsubmit} className='mt-3'>
            <h2 className='text-primary text-center font-weight-bold'>{!current ? 'Add contact' : 'Edit contact'}</h2>
            <div className="mb-2">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder='Name' name='name' value={name}
                       onChange={onchange} required/>
            </div>
            <div className="mb-2">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" placeholder='Email Address' name='email'
                       value={email} onChange={onchange}/>
            </div>
            <div className="mb-2">
                <label htmlFor="phone" className="form-label">Phone number</label>
                <input type="text" className="form-control" id="phone" placeholder='Phone' name='phone' value={phone}
                       onChange={onchange}/>
            </div>
            <h5 className='mt-3'>Contact Type</h5>
            <div className='container d-inline-flex mb-1'>
                <div className="form-check mr-3">
                    <input
                        className="form-check-input"
                        type="radio" name="type"
                        id='personal'
                        value='personal'
                        checked={type === 'personal'}
                        onChange={onchange}
                    />
                    <label className="form-check-label" htmlFor="personal">
                        Personal
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name='type'
                        id="professional"
                        value='professional'
                        onChange={onchange}
                    />
                    <label className="form-check-label" htmlFor="professional">
                        Professional
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary container-fluid mt-1"
                disabled={name === ''}
            >
                {!current ? 'Add contact' : 'Update contact'}
            </button>
            {current && <button onClick={clearAll} className="btn btn-danger container-fluid mt-1">Clear</button>}
        </form>
    );
};

export default ContactForm;