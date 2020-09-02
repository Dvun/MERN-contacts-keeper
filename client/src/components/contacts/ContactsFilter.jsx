import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {filterContacts, clearFilter} from "../../reducers/contact/action";

const ContactsFilter = () => {
    const dispatch = useDispatch()
    const filter = useRef('')

    const onChange = () => {
        if (filter.current.value !== '') {
            dispatch(filterContacts(filter.current.value))
        } else {
            dispatch(clearFilter())
        }
    }

    return (
        <div className="input-group my-3">
            <span className="input-group-text" id="filter">Filter contacts...</span>
            <input type="text" className="form-control" id="filter" onChange={onChange} ref={filter}/>
        </div>
    );
};

export default ContactsFilter;