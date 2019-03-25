import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Container, ListGroup } from 'react-bootstrap';
import StartGame from './components/start-game';
// import {  } from 'react-router-dom';
// import { ListGroup } from 'react-bootstrap';
import { Provider, Subscribe } from 'unstated';
import UsersContainer from "./store/users";

const Home = () => {
  return (
    <Provider>
      <Container>
        <p>
          Welcome To Resist.
        </p>
        <Subscribe to={[ UsersContainer ]}>
          {users =>
            <Button onClick={users.findAll} variant="primary"><Link className="btn btn-primary" to="/start-game">Start Game</Link></Button>
          }
        </Subscribe>
      </Container>
    </Provider>
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
