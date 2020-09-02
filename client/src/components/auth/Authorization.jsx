import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useHistory} from "react-router-dom";
import {faEnvelope, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../reducers/alert/action";
import {clearErrors, loginUser, registerUser} from "../../reducers/auth/action";

const Authorization = ({location}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const url = location.pathname
    const {error, isAuth} = useSelector(({authReducer}) => authReducer)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = user

    useEffect(() => {
        if (isAuth) {
            history.push('/home')
        }
        if (error !== null && error !== undefined) {
            dispatch(setAlert(error, 'danger'))
            dispatch(clearErrors())
        }
    }, [dispatch, error, isAuth, history])

    const onChangeToRegister = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onChangeToLogin = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (url === '/auth/register') {
            if (name === '' || email === '' || password === '') {
                dispatch(setAlert('Please enter all fields', 'danger'))
            } else if (url === '/auth/register' && password !== password2) {
                dispatch(setAlert('passwords do not match', 'danger'))
            } else {
                dispatch(registerUser({name, email, password}))
            }
        } else {
            if (email === '' || password === '') {
                dispatch(setAlert('Please enter all fields', 'danger'))
            } else if (url === '/auth/register' && password !== password2) {
                dispatch(setAlert('passwords do not match', 'danger'))
            } else {
                dispatch(loginUser({name, email, password}))
            }
        }
    }

    return (
        <div className="card bg-light mt-5">
            <article className="card-body mx-auto" style={{maxWidth: '400px'}}>
                <h4 className="card-title mt-3 text-center"
                >
                    {url === '/auth/register' ? 'Create Account' : 'Login Account'}
                </h4>
                <form onSubmit={onSubmit}>
                    {url === '/auth/register' && <div className="form-group input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100">
                                <FontAwesomeIcon icon={faUser}/>
                            </span>
                        </div>
                        <input name='name' className="form-control" placeholder="Your name" type="text"
                               onChange={url === '/auth/register' ? onChangeToRegister : onChangeToLogin} required/>
                    </div>}

                    {/*form-group*/}
                    <div className="form-group input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100" style={{width: '40px'}}>
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </span>
                        </div>
                        <input name='email' className="form-control" placeholder="Email address" type="email"
                               onChange={url === '/auth/register' ? onChangeToRegister : onChangeToLogin} required/>
                    </div>
                    {/*form-group*/}
                    <div className="form-group input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100"> <FontAwesomeIcon icon={faLock}/> </span>
                        </div>
                        <input
                            name='password'
                            className="form-control"
                            placeholder={url === '/auth/register' ? "Create password" : 'Password'}
                            type="password"
                            onChange={url === '/auth/register' ? onChangeToRegister : onChangeToLogin} required
                            minLength='4'/>
                    </div>

                    {/*form-group*/}
                    {url === '/auth/register' && <div className="form-group input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100"> <FontAwesomeIcon icon={faLock}/> </span>
                        </div>
                        <input name='password2' className="form-control" placeholder="Repeat password" type="password"
                               onChange={url === '/auth/register' ? onChangeToRegister : onChangeToLogin} required
                               minLength='4'/>
                    </div>}

                    {/*form-group*/}
                    <div className="form-group mt-3">
                        <button type="submit"
                                className="btn btn-primary btn-block"
                        >
                            {url === '/auth/register' ? 'Create Account' : 'Login'}
                        </button>
                    </div>

                    {/*form-group*/}
                    <p className="text-center">{url === '/auth/register' ? 'Have an account? ' : 'Have not an account? '}
                        <Link
                            to={url === '/auth/register' ? '/auth/login' : '/auth/register'}
                        >
                            {url === '/auth/register' ? ' Log in' : ' Register'}
                        </Link>
                    </p>
                </form>
            </article>
        </div>
    );
};

export default Authorization;