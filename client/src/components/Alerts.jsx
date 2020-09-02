import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {removeAlert} from "../reducers/alert/action";

const Alerts = () => {
    const dispatch = useDispatch()
    const alerts = useSelector(state => state.alertReducer.alerts)

    useEffect(() => {
        if (alerts.length > 0) {
            alerts.forEach(alert => setTimeout(() => dispatch(removeAlert(alert.id)), 4000))
        }
    }, [dispatch, alerts])


    return (
        alerts.length > 0 && alerts.map(alert => {
            return <div key={alert.id} className={`alert alert-${alert.type}`}>
                <FontAwesomeIcon icon={faInfoCircle}/> {alert.msg}
            </div>
        })
    );
};

export default Alerts;