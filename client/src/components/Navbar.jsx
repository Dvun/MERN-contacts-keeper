import React from 'react';
import PropTypes from 'prop-types'
import {faIdCardAlt} from "@fortawesome/free-solid-svg-icons/faIdCardAlt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../reducers/auth/action";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {clearAllContacts} from "../reducers/contact/action";


const Navbar = ({title, icon}) => {
    const dispatch = useDispatch()
    const {isAuth, user} = useSelector(({authReducer}) => authReducer)

    const onClick = () => {
        dispatch(logoutUser())
        dispatch(clearAllContacts())
    }

    return (
        <Nav className="navbar bg-primary py-2">
            <div className="container-fluid">
                <h1 className='text-white'>
                    <Link to='/about' style={{color: 'white', textDecoration: 'none'}}><FontAwesomeIcon icon={icon}/> {title}</Link>
                </h1>
                <ul className="nav justify-content-end">
                    {!isAuth ?
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to='/auth/register'>Register</Link>
                        </li>
                        :
                        <li className="nav-item active align-self-end">
                            <h6 className='text-white font-weight-bold' style={{marginBottom: '.6rem'}}>Hello, {user !== null && user.name}</h6>
                        </li>
                    }
                    {!isAuth ?
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to='/auth/login'>Login</Link>
                        </li>
                        :
                        <li className="nav-item active">

                                <Link className="nav-link text-white" to='/auth/login' onClick={onClick}>
                                    <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                                </Link>
                        </li>
                    }
                </ul>
            </div>
        </Nav>
    );
};


const Nav = styled.nav`
  padding: 0;
`

Navbar.propType = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: faIdCardAlt
}

export default Navbar;