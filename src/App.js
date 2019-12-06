import React, {Component} from 'react';
import './App.css';
import UserInput from './Component/UserInput/UserInput';
import UserOutput from './Component/UserOutput/UserOutput';
import './Component/UserOutput/UserOutput.css';
import ValidationComponent from './Component/ValidationComponent';
import CharComponent from './Component/CharComponent/CharComponent'
import './Component/CharComponent/CharComponent.css'
import Task from './Component/Task/Task'

class App extends Component {
  state = {
    strValue: "",
    showText: false
  };

  onChangeHandler = (event) => {
    this.setState({"strValue": event.target.value});
  };

  toggleShowPershonHandler = () => {
    this.setState({showText: !this.state.showText});
  };

  deleteCharHandler = (index) => {
    const tempStr = this.state.strValue.split('');
    tempStr.splice(index, 1);
    const updatedText = tempStr.join('');
    this.setState({strValue: updatedText});
  };  

  render () {
    const charComponentList = this.state.strValue.split('').map((ch, index) => {
      return <CharComponent letter={ch} key={index} clicked={() => this.deleteCharHandler(index)}></CharComponent>
    });

    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      paddint: '8px',
      cursor: 'pointer',
    };
    
    const centerStyle = {
      width: '100%', display: 'flex', justifyContent: 'center'
    };

    if (this.state.showText) {
      buttonStyle.backgroundColor = "red";
    }

    return (
      <div className="App">
        <div style={centerStyle}>
          <button style={buttonStyle} onClick={this.toggleShowPershonHandler}>Push me</button>
        </div>
        {this.state.showText ? <Task/> : null}
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <hr />    
        
        <input onChange={(event)=>this.onChangeHandler(event)} value={this.state.strValue}/>
        <label>{this.state.strValue}</label>
        <ValidationComponent length={this.state.strValue.length}></ValidationComponent>
        {charComponentList}
      </div>
    )   
  };
}

export default App;
