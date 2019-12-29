import { Container } from 'unstated';
import HttpUtil from './http-util';
export const USERS_ENDPOINT = '/api/users';
export const RESIST_ENDPOINT = '/api/resist';


class UsersContainer extends Container {
  // set inital state
  state = { users: [], selectedUserIds: [], gameId: null };
  // might send this over the wire later
  MAX_PLAYERS = 7;
  MIN_PLAYERS = 5;


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

    // add user otherwise
    await this.setState({
      ...this.state,
      selectedUserIds: this.state.selectedUserIds.concat([userId])
    });
  }

  canCreateGame = () => {
    const selectedPlayerCount = this.state.selectedUserIds.length;
    return (selectedPlayerCount <= this.MAX_PLAYERS &&
      selectedPlayerCount >= this.MIN_PLAYERS);
  }

  createGame = async () => {
    if (!this.canCreateGame()) {
      // should never make it here due to UI
      throw new Error("Incorrect amount of players");
    }

    const { gameId } = await HttpUtil.postData(`${RESIST_ENDPOINT}/StartGame`, this.state.selectedUserIds.map(i => Number(i)));
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