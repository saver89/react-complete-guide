import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {

    // static getDerivedStateFromProps (props, state) {
    //   console.log('[Persons.js] getDerivedStateFromProps');
    //   return state;
    // }

    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons) {
            return true;
        } else {
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidMount');
        console.log(snapshot);
    }

    render = () => {
        console.log('[Persons.js] rendering...');
        return (this.props.persons.map((person, index)=> {
            return <Person
                personClickHandler={() => {this.props.personClickHandler(index)}}
                name={person.name}
                age={person.age}
                key={person.id}
                nameChangeHandler={(event)=> {this.props.nameChangeHandler(event, person.id)}}/>
        }));
    }
}

export default Persons;