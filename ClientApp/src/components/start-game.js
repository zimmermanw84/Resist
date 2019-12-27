import React, { Component } from 'react';
import { FormGroup, Form, Button } from 'react-bootstrap';
import getUsersContainerInstance from "../store/users";
import { Provider, Subscribe } from 'unstated';
import { Link } from "react-router-dom";

const usersContainer = getUsersContainerInstance();

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
              <Form.Label>Username</Form.Label>
              {/* Add Validation */}
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
    const { userid } =  e.currentTarget.dataset;
    // when we store the user id on the dom it is cast to a string
    // honestly I am guessing we don't even have to do this lol
    await usersContainer.selectUser(Number(userid));
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

              {users.state.selectedUserIds.length === 5 && users.state.gameId &&
                <Button key={users.state.gameId} variant="danger">
                  <Link to={`/game/${users.state.gameId}`}>Start</Link>
                </Button>
              }
              <FormGroup>
              {users.state.users.map && users.state.selectedUserIds.map && users.state.users.map(user => {
                    return (
                      <Form.Check
                        type='radio'
                        key={user.userId}
                        id={user.userId}
                        >
                        <Form.Check.Input
                          type='radio'
                          key={user.userId}
                          onChange={(e) => this.selectUser(e)}
                          data-userid={user.userId}
                          checked={users.state.selectedUserIds.includes(user.userId)}
                        />
                        <Form.Check.Label>{user.username}</Form.Check.Label>
                      </Form.Check>
                    )
                  }
                )
              }
              </FormGroup>
            </Form>
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