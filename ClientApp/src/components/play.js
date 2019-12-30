import React, { Component } from 'react';
import getCurrentGameContainerInstance from "../store/current-game";
import { Provider } from 'unstated';
import ShowPlayersRoles from './show-players-roles';
import NightPhase from './night-phase';

const currentGameContainer = getCurrentGameContainerInstance();

export default class Play extends Component {
  render() {
    return (
      <div>
        Hello from missions
      </div>
    )
  }
}