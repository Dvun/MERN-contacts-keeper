import React, {useEffect} from 'react';
import {ContactItem, Spinner} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './animation.css'
import {getContacts} from "../../reducers/contact/action";

const Contacts = () => {
    const dispatch = useDispatch()
    const {contacts, filtered, loading} = useSelector(({contactReducer}) => contactReducer)

    useEffect(() => {
            dispatch(getContacts())
        // eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0) {
        return <h4 className='text-center'>Please add contact</h4>
    }

    return (
        <>
            {contacts !== null && !loading ?
                (<TransitionGroup>
                    {
                        filtered !== null ?
                            filtered.map(contact => (
                                <CSSTransition
                                    key={contact._id}
                                    timeout={500}
                                    classNames='alert'
                                >
                                    <ContactItem contact={contact}/>
                                </CSSTransition>)
                            )
                            :
                            contacts.map(contact => (
                                <CSSTransition
                                    key={contact._id}
                                    timeout={500}
                                    classNames='alert'
                                >
                                    <ContactItem contact={contact}/>
                                </CSSTransition>))
                    }
                </TransitionGroup>)
                :
                <Spinner/>}
        </>
    );
};


export default Contacts;