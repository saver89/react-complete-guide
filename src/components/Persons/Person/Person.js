import React from 'react';
import classes from './Person.css';

const person = (props) => {
    return (<div onClick={props.personClickHandler} className={classes.Person}>
        <input onChange={props.nameChangeHandler} type="text" value={props.name}/>
        <p>{props.name}</p>
        <p>{props.age}</p>
    </div>);
};

export default person;