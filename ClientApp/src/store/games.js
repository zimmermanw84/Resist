import { Container } from 'unstated';
import HttpUtil from './http-util';
export const GAME_ENDPOINT = '/api/games';

class GameContainer extends Container {
  // set inital state
  state = { games: [], activeGames: [] };


  getActiveGames = async () => {
    const { games } = await HttpUtil.get(GAME_ENDPOINT + "?status=Active");
    await this.setState({ ...this.state, games });
  }
}

export default GameContainer;