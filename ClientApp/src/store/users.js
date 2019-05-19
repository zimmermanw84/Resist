import { Container } from 'unstated';
import HttpUtil from './http-util';
export const USERS_ENDPOINT = '/api/users';
export const RESIST_ENDPOINT = '/api/resist';

// later this will be configurable
const MAX_PLAYERS = 5;

class UsersContainer extends Container {
  // set inital state
  state = { users: [], selectedUserIds: [], gameId: null };

  addUser = async (username) => {
    await HttpUtil.postData(USERS_ENDPOINT, { username });
    return this.findAll();
  }

  findAll = async () => {
    const users = await HttpUtil.get(USERS_ENDPOINT);
    await this.setState({ ...this.state, users });
    return users;
  }

  selectUser = async (userId) => {
    if (this.state.selectedUserIds.includes(userId)) {
      // remove if it's included alread for toggling
      await this.setState({
        ...this.state,
        selectedUserIds: this.state.selectedUserIds.filter(id => id !== userId)
      });

      return;
    }

    if (this.state.selectedUserIds.length === MAX_PLAYERS) {
      // should never get here
      return;
    }

    // add user otherwise
    await this.setState({
      ...this.state,
      selectedUserIds: this.state.selectedUserIds.concat([userId])
    });

    // if we're full after we added then let's get started
    if (this.state.selectedUserIds.length === MAX_PLAYERS) {
      // Mainly because we need to route to the game
      await this.startGame();
    }
  }

  startGame = async () => {
    if (this.state.selectedUserIds.length !== MAX_PLAYERS) {
      // should never make it here due to UI
      throw new Error("Not enough players to start");
    }

    const { gameId } = await HttpUtil.postData(`${RESIST_ENDPOINT}/StartGame`, this.state.selectedUserIds.map(i => Number(i)));
    await this.setState({ ...this.state, gameId });
  }
}

export default UsersContainer;