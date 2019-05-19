import React, { Component } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import UsersContainer from "../store/users";
import { Provider, Subscribe } from 'unstated';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const usersContainer = new UsersContainer();

class CreateUser extends Component {
  constructor() {
    super(...arguments);

    this.state = { username: "" };
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleSubmit(users, e) {
    e.preventDefault();
    users.addUser(this.state.username);
    this.setState({username: ""})
  }

  render() {
    return (
      <Subscribe to={[ usersContainer ]}>
      {users => (
          <Form onSubmit={(e) => this.handleSubmit(users, e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter username" value={this.state.username} onChange={((e) => this.setUsername(e))} />
            </Form.Group>
            <Button variant="danger" type="submit">Add</Button>
          </Form>
      )}
      </Subscribe>
    )
  }
}

class CreateGameUsersList extends Component {
  constructor() {
    super(...arguments);

    this.state = { users: [] };
  }

  async componentDidMount() {
    // load inital state
    await usersContainer.findAll();
  }

  async selectUser(e) {
    e.preventDefault();
    const { userid } =  e.currentTarget.dataset;
    await usersContainer.selectUser(userid);
  }

  render() {
    return (
      <Subscribe to={[ usersContainer ]}>
        {(users) => (
          <div>
            <Form>
              <Form.Text className="text-muted">
                Select {users.state.selectedUserIds.length}/5 Players selected.
              </Form.Text>

              <Button key={users.state.gameId} variant="danger" disabled={users.state.selectedUserIds.length !== 5 && users.state.gameId}>
                <Link to={`/game/${users.state.gameId}`}>Start</Link>
              </Button>
            </Form>
            <ListGroup>
            {users.state.users.map && users.state.selectedUserIds.map && users.state.users.map(user => {
                  return (
                    <ListGroup.Item
                      style={{color:"black"}}
                      key={user.userId}
                      onClick={(e) => this.selectUser(e)}
                      data-userid={user.userId}
                      // TODO: come back to this
                      // show selected user
                      // active={users.state.selectedUserIds.includes(user.userId)}
                      >{user.username}
                    </ListGroup.Item>
                  )
                }
              )
            }
            </ListGroup>
          </div>
        )}
      </Subscribe>
    )
  }
}

export default class StartGame extends Component {
  render() {
    return (
      <Provider>
        <CreateUser />
        <CreateGameUsersList />
      </Provider>
    )
  }
}