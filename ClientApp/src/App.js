import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import StartGame from './components/start-game';
// import {  } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome To Resist.
          </p>
          <Router>
            <Link to="/start-game">
              <Button variant="primary">Start Game</Button>
            </Link>
          </Router>
        </header>

        <Route path="/start-game" component={StartGame} />
      </div>
    );
  }
}

export default App;
