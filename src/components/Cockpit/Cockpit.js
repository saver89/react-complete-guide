import React, { useEffect } from 'react';
import classes from './Cockpit.css'

const Cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
    });

    let btnClass = null;

    if (props.showPersons) {
        btnClass = classes.red;
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <button className={btnClass} onClick={props.clicked}>Show persons</button>
        </div>
    );
};

export default Cockpit;