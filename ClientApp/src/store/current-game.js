import { Container } from 'unstated';
import HttpUtil from './http-util';
export const GAME_ENDPOINT = '/api/games';

class CurrentGameContainer extends Container {
  // set inital state
  state = {
    game: [],
    config: [],
    users: [],
    missions: []
  };

  getCurrentGame = async (id) => {
    const { game, config } = await HttpUtil.get(GAME_ENDPOINT + "/CurrentGame/" + id);
    await this.setState({
      ...this.state,
      game,
      users: game.gameUsers.sort((a, b) => a.position - b.position),
      missions: game.missions,
      config,
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