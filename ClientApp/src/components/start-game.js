import React, { Component } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import UsersContainer from "../store/users";
import { Provider, Subscribe } from 'unstated';



class CreateUser extends Component {
  constructor() {
    super(...arguments);

    this.state = { username: "" };
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(users, e) {
    console.log("ON SUBMIT");
    e.preventDefault();
    console.log("AFTER SUBLIT", e);
    users.addUser(this.state.username);
    this.setState({username: ""})
  }

  render() {
    return (
      <Subscribe to={[ UsersContainer ]}>
      {users => (
          <Form onSubmit={(e) => this.handleSubmit(users, e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter username" value={this.state.username} onChange={((e) => this.setUsername(e))} />
              <Form.Text className="text-muted">
                Select 5 Players to start.
              </Form.Text>
            </Form.Group>
            <Button variant="danger" type="submit">Add</Button>
          </Form>
      )}
      </Subscribe>
    )
  }
}

const UsersList = (props = {}) => {
  return (
    <ListGroup>
      <Subscribe to={[ UsersContainer ]}>
        {(users) => (
          users.state.users.map && users.state.users.map(user => {
            return (
              <ListGroup.Item
                style={{color: "black"}}
                key={user.id}
                onClick={users.selectUser}
                disabled={users.state.gameUsers && users.state.gameUsers.map(u => u.id).includes(user.id)}
                data-userId={user.id}
                >{user.username}</ListGroup.Item>
              )
            }
          )
        )}
      </Subscribe>
    </ListGroup>
  )
}

export default class StartGame extends Component {
  render() {
    return (
      <Provider>
        <CreateUser />
        <UsersList />
      </Provider>
    )
  }
}