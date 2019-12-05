import React, {Component} from 'react';
import './App.css';
import UserInput from './Component/UserInput/UserInput';
import UserOutput from './Component/UserOutput/UserOutput';
import './Component/UserOutput/UserOutput.css';
import ValidationComponent from './Component/ValidationComponent';
import CharComponent from './Component/CharComponent/CharComponent'
import './Component/CharComponent/CharComponent.css'
import Radium from 'radium';

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
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    
    const centerStyle = {
      width: '100%', display: 'flex', justifyContent: 'center'
    };

    if (this.state.showText) {
      buttonStyle.backgroundColor = "red";
      buttonStyle[":hover"].backgroundColor = "salmon";
      buttonStyle[":hover"].color = "black";
    }

    return (
      <div className="App">
        <div style={centerStyle}>
          <button style={buttonStyle} onClick={this.toggleShowPershonHandler}>Push me</button>
        </div>
        {this.state.showText ? <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol> : null}
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

export default Radium(App);
