import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Container, ListGroup } from 'react-bootstrap';
// import StartGame from './components/start-game';
// import {  } from 'react-router-dom';
// import { ListGroup } from 'react-bootstrap';
import Async from 'react-async';
import User from "./store/users";

const Home = () => {
  return (
    <Container>
      <p>
        Welcome To Resist.
      </p>
      <Button variant="primary"><Link className="btn btn-primary" to="/start-game">Start Game</Link></Button>
    </Container>
  )
}

const StartGame = () => {
  return (
    <Async promiseFn={User.findAll}>
        {({data, error, isLoading}) => {
          if (data) {
            return (
              <div>
                {JSON.stringify(data)}
              </div>
            )
          }
          return null;
        }}
    </Async>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/start-game" component={StartGame} />
          </Router>
        </header>
      </div>
    );
  }
}

module.hot.accept();

export default App;
