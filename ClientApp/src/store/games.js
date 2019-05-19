import { Container } from 'unstated';
import HttpUtil from './http-util';

class GameContainer extends Container {
  // set inital state
  state = { users: [], selectedUsers: [] };

  addUser = async (username) => {
    await HttpUtil.postData(USERS_ENDPOINT, { username });
    return this.findAll();
  }

  static findAll = async () => {
    const users = await HttpUtil.get(USERS_ENDPOINT);
    // await this.setState({ ...this.state, users });
    return users;
  }
}

let instance;

function getInstance() {
  if (!instance) {
    instance = new GameContainer();
  }

  return instance;
}

export default getInstance();