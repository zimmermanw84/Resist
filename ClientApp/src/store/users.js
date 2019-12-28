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

  isUserSelected = (userId) => {
    return this.state.selectedUserIds.includes(userId);
  }

  selectUser = async (userId) => {
    if (this.isUserSelected(userId)) {
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

    // // if we're full after we added then let's get started
    if (this.state.selectedUserIds.length === MAX_PLAYERS) {
      // Mainly because we need to route to the game
      await this.createGame();
    }
  }

  createGame = async () => {
    if (this.state.selectedUserIds.length !== MAX_PLAYERS) {
      // should never make it here due to UI
      throw new Error("Not enough players to start");
    }

    const { gameId } = await HttpUtil.postData(`${RESIST_ENDPOINT}/StartGame`, this.state.selectedUserIds.map(i => Number(i)));
    console.log("gameId", gameId)
    await this.setState({ ...this.state, gameId });
  }
}

// We only want the state containers to be initialized once per app
// there are better abstractions but this is a toy and we can clean this
// up later
let usersContainerInstance;

export default function getUsersContainerInstance() {
  if (!usersContainerInstance) {
    usersContainerInstance = new UsersContainer();
  }

  return usersContainerInstance;
}