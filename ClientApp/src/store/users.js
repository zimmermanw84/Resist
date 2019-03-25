import { Container } from 'unstated';
import HttpUtil from './http-util';
const USERS_ENDPOINT = '/api/users';

class UsersContainer extends Container {
  // set inital state
  state = { users: [], selectedUsers: [] };

  addUser = async (username) => {
    await HttpUtil.postData(USERS_ENDPOINT, { username });
    return this.findAll();
  }

  findAll = async () => {
    const users = await HttpUtil.get(USERS_ENDPOINT);
    await this.setState({ ...this.state, users });
    return users;
  }

  selectUser = async (e) => {
    const user = e.target;
    console.log("USER", user);
  }
}

let instance;

function getInstance() {
  if (!instance) {
    instance = new UsersContainer();
  }

  return instance;
}

export default getInstance();