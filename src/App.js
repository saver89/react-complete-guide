import React, {Component} from 'react';
import './App.css';
import UserInput from './Component/UserInput/UserInput';
import UserOutput from './Component/UserOutput/UserOutput';
import './Component/UserOutput/UserOutput.css';

class App extends Component {
  state = {
    persons: []
  };

  usernameOnChageHandler = (event) => {
    this.setState({persons:["aaa", "bbb", "ccc12"]});
  }

  render () {
    return <div className="App">
      <UserInput currentName={this.state.username} onChange={this.usernameOnChageHandler}/>
      {this.state.persons.map(person => {
        return <p>{person}</p>;
      })}
    </div>    
  };
}

export default App;
