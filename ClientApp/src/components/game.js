import React, { Component } from 'react';
import getCurrentGameContainerInstance from "../store/current-game";
import { Provider } from 'unstated';
import ShowPlayersRoles from './show-players-roles';

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
          <ShowPlayersRoles />
        </Provider>
      </div>
    )
  }
}