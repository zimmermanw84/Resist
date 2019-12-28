import React, { Component } from 'react';
// import { ListGroup, Form, Button } from 'react-bootstrap';
import getCurrentGameContainerInstance from "../store/current-game";
import { Provider, Subscribe } from 'unstated';

const currentGameContainer = getCurrentGameContainerInstance();


export default class Game extends Component {
  constructor() {
    super(...arguments);

    this.state = { game: null };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    // load inital state
    await currentGameContainer.getCurrentGame(id);
  }

  render() {
    return (
      <div>
        <Provider>
          <div>
            HELLO
          <Subscribe to={[ currentGameContainer ]}>
            {(currentGame) => (
              <div>
                {currentGame.state.game.gameId}
              </div>
            )}
          </Subscribe>
          </div>
        </Provider>
      </div>
    )
  }
}