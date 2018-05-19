import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/form.js'
require('dotenv').config()

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <h3>Are you happy and you know it?</h3>
          <Form />


      </div>
    );
  }
}

export default App;
