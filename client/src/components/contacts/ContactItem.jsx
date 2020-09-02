import React from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeOpen, faPhone} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {deleteContact, clearCurrent, setCurrent} from "../../reducers/contact/action";

const ContactItem = ({contact}) => {
    const dispatch = useDispatch()
    const {_id, name, email, phone, type} = contact

    const onDelete = (id) => {
        dispatch(deleteContact(id))
        dispatch(clearCurrent())
    }

    const editCurrentContact = (contact) => {
        dispatch(setCurrent(contact))
    }

    return (
        <DIV className='card bg-secondary bg-gradient my-2 py-2 px-3'>

            <h6 className="text-danger text-left font-weight-bold">
                {name}
                <span className={'float-right badge ' + (type === 'professional' ? 'bg-success' : 'bg-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h6>
            <ul className='list-group'>
                {email && (<li className='list-unstyled'>
                    <FontAwesomeIcon icon={faEnvelopeOpen}/> {email}
                </li>)}
                {phone && (<li className='list-unstyled'>
                    <FontAwesomeIcon icon={faPhone}/> {phone}
                </li>)}
            </ul>
            <div style={{marginTop: '0.5rem'}}>
                <button className="btn btn-dark btn-sm mr-2" onClick={() => editCurrentContact(contact)}>Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(_id)}>Delete</button>
            </div>

        </DIV>
    );
};

const DIV = styled.div`
    :first-child {
    margin-top: 1rem !important;
    }
`

export default ContactItem;