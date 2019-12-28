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
    const game = await HttpUtil.get(GAME_ENDPOINT + "/CurrentGame/" + id);
    console.log("GAME", game);
    await this.setState({ ...this.state, game });
  }
}

let currentGameContainerInstance;

export default function getCurrentGameContainerInstance() {
  if (!currentGameContainerInstance) {
    currentGameContainerInstance = new CurrentGameContainer();
  }

  return currentGameContainerInstance;
}