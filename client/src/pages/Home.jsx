import React, {useEffect} from 'react';
import {ContactForm, Contacts} from "../components";
import ContactsFilter from "../components/contacts/ContactsFilter";
import {useDispatch, useSelector} from "react-redux";
import {loadUser} from '../reducers/auth/action'
import {Redirect} from 'react-router-dom'


const Home = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(({authReducer}) => authReducer)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        isAuth ?
            <div className="row">
                <div className="col-6">
                    <ContactForm/>
                </div>
                <div className="col-6">
                    <ContactsFilter/>
                    <Contacts/>
                </div>
            </div>
            :
            <Redirect to='auth/login'/>
    );
};

export default Home;