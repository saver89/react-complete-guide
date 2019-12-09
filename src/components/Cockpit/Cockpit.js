import React from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {

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

export default cockpit;