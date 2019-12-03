import React, {Component} from 'react';
import './App.css';
import UserInput from './Component/UserInput/UserInput';
import UserOutput from './Component/UserOutput/UserOutput';
import './Component/UserOutput/UserOutput.css';
import ValidationComponent from './Component/ValidationComponent';
import CharComponent from './Component/CharComponent/CharComponent'
import './Component/CharComponent/CharComponent.css'

class App extends Component {
  state = {
    strValue: ""
  };

  onChangeHandler = (event) => {
    this.setState({"strValue": event.target.value});
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

    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
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
