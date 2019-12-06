import React, { Component } from 'react';
import classes from './App.css';
import UserInput from './Component/UserInput/UserInput';
import UserOutput from './Component/UserOutput/UserOutput';
import './Component/UserOutput/UserOutput.css';
import ValidationComponent from './Component/ValidationComponent';
import CharComponent from './Component/CharComponent/CharComponent'
import './Component/CharComponent/CharComponent.css'
import Task from './Component/Task/Task'
import ErrorBoundary from './Component/ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    strValue: "",
    showText: false
  };

  onChangeHandler = (event) => {
    this.setState({ "strValue": event.target.value });
  };

  toggleShowPershonHandler = () => {
    const randomNumber = Math.random();
    if (randomNumber > 0.7) throw Error('ERROR');

    this.setState({ showText: !this.state.showText });
  };

  deleteCharHandler = (index) => {
    const tempStr = this.state.strValue.split('');
    tempStr.splice(index, 1);
    const updatedText = tempStr.join('');
    this.setState({ strValue: updatedText });
  };

  render() {
    const charComponentList = this.state.strValue.split('').map((ch, index) => {
      return <CharComponent letter={ch} key={index} clicked={() => this.deleteCharHandler(index)}></CharComponent>
    });

    const centerStyle = {
      width: '100%', display: 'flex', justifyContent: 'center'
    };

    let btnClass = null;
    if (this.state.showText) {
      btnClass = classes.red;
    }

    return (
      <ErrorBoundary>
        <div className={classes.App}>
          <div style={centerStyle}>
            <button className={btnClass} onClick={this.toggleShowPershonHandler}>Push me</button>
          </div>
          {this.state.showText ? <Task /> : null}
          <p className={classes.red}>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
          <hr />

          <input onChange={(event) => this.onChangeHandler(event)} value={this.state.strValue} />
          <label>{this.state.strValue}</label>
          <ValidationComponent length={this.state.strValue.length}></ValidationComponent>
          {charComponentList}
        </div>
      </ErrorBoundary>
    )
  };
}

export default App;
