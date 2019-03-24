import HttpUtil from './http-util';
const USERS_ENDPOINT = '/api/users';

export default class User {
  static async findAll() {
    console.log("IS THIS GETTING CALLED???");
    const some = await HttpUtil.get(USERS_ENDPOINT);
    console.log("HERE IS THE RESPOSMSE", some)
    return some;
  }
}