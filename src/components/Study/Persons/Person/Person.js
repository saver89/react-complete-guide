import React, { Component } from 'react';
import classes from './Person.css';

class Person extends Component {
    render () {
        console.log('[Person.js] rendering...');

        return (<div onClick={this.props.personClickHandler} className={classes.Person}>
            <input onChange={this.props.nameChangeHandler} type="text" value={this.props.name} 
                onClick={(e) => { e.stopPropagation(); }} />
            <p>{this.props.name}</p>
            <p>{this.props.age}</p>
        </div>);
    }    
};

export default Person;