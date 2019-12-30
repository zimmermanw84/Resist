import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Container, Jumbotron, Nav } from 'react-bootstrap';
import StartGame from './components/start-game';
import PreGame from './components/pre-game';
import Play from './components/play';
import { Provider } from 'unstated';

export function JumboHeader() {
  return (
    <Jumbotron>
      <h1>Resist!</h1>
      <p>
        This game is just a toy for me to play around with some tech I don't use at work. It's inspired by an awesome table top game called Resistance.
      </p>
      <p>
        <Nav.Link  target="_blank" href="https://en.wikipedia.org/wiki/The_Resistance_(game)">Learn more</Nav.Link>
      </p>
    </Jumbotron>
  )
}

const Home = () => {
  return (
    <Provider>
      <JumboHeader />
      <p>
        Welcome To Resist.
      </p>
      <Button variant="primary"><Link className="btn btn-primary" to="/start-game">Start Game</Link></Button>
    </Provider>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <header className="App-header">
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/start-game" component={StartGame} />
              <Route path="/game/:id/pre-game" component={PreGame} />
              <Route path="/game/:id/play" component={Play} />
            </Router>
          </header>
        </Container>
      </div>
    );
  }
}

module.hot.accept();

export default App;
