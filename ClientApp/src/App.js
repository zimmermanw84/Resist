import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import StartGame from './components/start-game';
import RoleAssignment from './components/role-assignment';
import { Provider } from 'unstated';

const Home = () => {
  return (
    <Provider>
      <Container>
        <p>
          Welcome To Resist.
        </p>
        <Button variant="primary"><Link className="btn btn-primary" to="/start-game">Start Game</Link></Button>
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
            <Route path="/game/:id" component={RoleAssignment} />
          </Router>
        </header>
      </div>
    );
  }
}

module.hot.accept();

export default App;
