import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';

class App extends Component {
  state = {
    showPersons: false,
    persons: [
      { id: "#111", name: "Max", age: 28 },
      { id: "#222", name: "Manu", age: 29 },
      { id: "#333", name: "Stephanie", age: 26 }
    ]
  };

  toggleShowPershonHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };

  personClickHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons});
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  };

  render() {
    let btnClass = null, persons = null;
    if (this.state.showPersons) {
      btnClass = classes.red;
      persons = (<Persons
        persons={this.state.persons}
        personClickHandler={this.personClickHandler}
        nameChangeHandler={this.nameChangeHandler}
      />);
    }

    return (
      <div className={classes.App}>
        <div>
          <button className={btnClass} onClick={this.toggleShowPershonHandler}>Show persons</button>
          {persons}
        </div>
      </div>
    )
  };
}

export default App;
