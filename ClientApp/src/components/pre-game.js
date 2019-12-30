import React, { Component } from 'react';
import getCurrentGameContainerInstance from "../store/current-game";
import { Provider } from 'unstated';
import ShowPlayersRoles from './show-players-roles';
import NightPhase from './night-phase';

const currentGameContainer = getCurrentGameContainerInstance();

export default class PreGame extends Component {
  constructor() {
    super(...arguments);

    this.state = { game: null };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    // load inital state
    if (!currentGameContainer.isLoaded) {
      await currentGameContainer.getCurrentGame(id);
    }
  }

  render() {
    return (
      <div>
        <Provider>
          <ShowPlayersRoles />
          <NightPhase />
        </Provider>
      </div>
    )
  }
}