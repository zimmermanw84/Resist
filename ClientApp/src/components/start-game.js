import React, { Component } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
import getUsersContainerInstance from "../store/users";
import { Provider, Subscribe } from 'unstated';
import { Redirect } from "react-router-dom";
import { JumboHeader } from "../App";

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
    // kind janky should be a submit event but there's an issue with the inputgroup.prepend component
    users.addUser(this.state.username);
    this.setState({username: ""})
  }

  render() {
    return (
      <Subscribe to={[ usersContainer ]}>
      {users => (
          <Form as={Col}>
            <InputGroup.Text as={Row} style={{backgroundColor: "white", border: "none"}} className="mb-3">
              Add Player
            </InputGroup.Text>
            <Form.Row>
              <InputGroup md="8" as={Col}>
                <Form.Control placeholder="Enter username" value={this.state.username} onChange={((e) => this.setUsername(e))} />
                <InputGroup.Prepend>
                  <Button onClick={(e) => this.handleSubmit(users, e)} variant="primary" type="submit">Add</Button>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Row>
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

  async createGame(e) {
    await usersContainer.createGame();
  }

  render() {
    return (
      <Subscribe to={[ usersContainer ]}>
        {(users) => (
          <div>
            {
              // if game is created start the game
              users.state.gameId &&
              <Redirect to={`/game/${usersContainer.state.gameId}/pre-game`}/>
            }
            <InputGroup>
              <InputGroup.Text style={{backgroundColor: "white", border: "none"}} className="mb-3">
                {users.state.selectedUserIds.length} Players selected. (Select 5-7 Players)
              </InputGroup.Text>
            </InputGroup>

              <ul style={{listStyle: "none", padding: "0"}}>
                <li className="mb-3 d-flex flex-column">
                  <Button
                    disabled={!usersContainer.canCreateGame()}
                    key={users.state.gameId}
                    onClick={(e) => this.createGame(e)}
                    variant="danger"
                    size="lg"
                  >
                    Start
                    </Button>
                </li>
                {users.state.users.map && users.state.selectedUserIds.map && users.state.users.map(user => {
                    return (
                      <li className="mb-3 d-flex flex-column" key={user.userId}>
                        <Button
                          variant={users.isUserSelected(user.userId) ? "primary" : "light"}
                          size="lg"
                          onClick={(e) => this.selectUser(e)}
                          data-userid={user.userId}
                          block
                        >
                          {user.username}
                        </Button>
                      </li>
                    )
                  }
                )}
              </ul>
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
        <JumboHeader />
        <Row>
          <Col>
            <CreateUser />
          </Col>
          <Col>
            <CreateGameUsersList />
          </Col>
        </Row>
      </Provider>
    )
  }
}