import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
    return (props.persons.map((person, index)=> {
        return <Person
            personClickHandler={() => {props.personClickHandler(index)}}
            name={person.name}
            age={person.age}
            key={person.id}
            nameChangeHandler={(event)=> {props.nameChangeHandler(event, person.id)}}/>
    }));
};

export default persons;