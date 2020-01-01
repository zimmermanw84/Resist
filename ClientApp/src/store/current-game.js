import { Container } from 'unstated';
import HttpUtil from './http-util';
export const GAME_ENDPOINT = '/api/games';

class CurrentGameContainer extends Container {
  // set inital state
  state = {
    game: [],
    config: {},
    users: [],
    missions: [],
    isLoaded: false,

    showPlayerRoles: true,
    showNightPhase: false,
  };

  toggleNightPhase = () => {
    this.setState({
      ...this.state,
      showNightPhase: true,
      showPlayerRoles: false,
    });
  }

  completeNightPhase = () => {
    this.setState({
      ...this.state,
      showNightPhase: false,
    });
  }

  getCurrentGame = async (id) => {
    const { game, gameConfig } = await HttpUtil.get(GAME_ENDPOINT + "/CurrentGame/" + id);
    await this.setState({
      ...this.state,
      game,
      users: game.gameUsers.sort((a, b) => a.position - b.position),
      missions: game.missions,
      isLoaded: true,
      config: gameConfig,
    });
  }
}

let currentGameContainerInstance;

export default function getCurrentGameContainerInstance() {
  if (!currentGameContainerInstance) {
    currentGameContainerInstance = new CurrentGameContainer();
  }

  return currentGameContainerInstance;
}