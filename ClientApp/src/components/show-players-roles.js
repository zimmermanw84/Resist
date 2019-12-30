import React, { Component, useState } from 'react';
import { Subscribe } from 'unstated';
import getCurrentGameContainerInstance from "../store/current-game";
import { Card, Button, ButtonGroup, ListGroup } from 'react-bootstrap';

const currentGameContainer = getCurrentGameContainerInstance();

const PlayerRole = ({user, roleIsViewable}) => {
  let [viewRole, setViewRole] = useState(!roleIsViewable && false);

  let cardText;
  if (viewRole) {
    cardText = <Card.Text>{user.role}</Card.Text>
  }
  else {
    cardText = <Card.Text>XXXXXXXXXXXXXX</Card.Text>
  }

  return (
    <div>
      <Card bg="light" text="black" className="d-flex flex-column">
      <Card.Header> Do NOT show your role to anyone else!</Card.Header>
      <Card.Body>
        <Card.Title>
          <p>
            {user.user.username}
          </p>
          <Button onClick={(e) => setViewRole(!viewRole)} variant="danger">{viewRole ? "Hide" : "Show"} Role</Button>
        </Card.Title>
        {cardText}
      </Card.Body>
      </Card>
    </div>
  )
}

export default class ShowPlayersRoles extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      selectedPosition: 1,
    }
  }

  selectItem(e) {
    const { targetposition } =  e.currentTarget.dataset;
    this.setState({ selectedPosition: Number(targetposition) });
  }

  render() {
    return (
      <Subscribe to={[ currentGameContainer ]}>
      {(currentGame) => (
        <div>
        {currentGame.state.users && currentGame.state.users.map((user, i) => {
          return (
            <div key={user.position}>
              { this.state.selectedPosition && this.state.selectedPosition === user.position &&
                <>
                <PlayerRole user={user} roleIsViewable={this.state.selectedPosition === user.position} />
                <div className="d-flex flex-column">
                  <ButtonGroup key={user.gameUserId} className="mt-3">
                    <Button disabled={1 === user.position} onClick={(e) => this.selectItem(e)} data-targetposition={user.position - 1}>Previous</Button>
                    <Button disabled={currentGame.state.users.length === user.position} onClick={(e) => this.selectItem(e)} data-targetposition={user.position + 1}>Next</Button>
                  </ButtonGroup>
                </div>
                </>
              }
            </div>
          )
        })}
        {
          // If last item show night phase button
          <div className="d-flex flex-column">
          <ButtonGroup key={currentGame.gameId} className="mt-3">
            <Button disabled={currentGame.state.users.length !== this.state.selectedPosition} variant="danger">Start Night Phase</Button>
          </ButtonGroup>
          </div>
        }
        {currentGame.state.users && currentGame.state.users.map((user, i) => {
          return (
            <div class="mt-3" key={user.gameUserId}>
              <ListGroup as="ul">
                <ListGroup.Item as="li" active={i + 1 === this.state.selectedPosition}>
                  {user.user.username}
                </ListGroup.Item>
              </ListGroup>
            </div>
          )
        })}
      </div>
      )}
      </Subscribe>
    )
  }
}