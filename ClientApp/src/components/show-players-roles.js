import React, { Component, useState } from 'react';
import { Subscribe } from 'unstated';
import getCurrentGameContainerInstance from "../store/current-game";
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const currentGameContainer = getCurrentGameContainerInstance();

const PlayerRole = ({user}) => {
  let [viewRole, setViewRole] = useState(false);

  let cardText;
  if (viewRole) {
    cardText = <Card.Text>{user.role}</Card.Text>
  }
  else {
    cardText = <Card.Text>XXXXXXXXXXXXXX</Card.Text>
  }

  return (
    <div>
      <Card bg="dark" text="white" style={{ width: '18rem' }}>
      <Card.Header>For {user.user.username} Eyes ONLY!!!</Card.Header>
      <Card.Body>
        <Card.Title>
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
      selectedUser: null,
    }
  }

  selectItem(e) {
    const { targetposition } =  e.currentTarget.dataset;
    this.setState({ selectedPosition: targetposition });
  }

  render() {
    return (
      <Subscribe to={[ currentGameContainer ]}>
      {(currentGame) => (
        <div>
        {currentGame.state.users && currentGame.state.users.length &&
            <div>
              { this.state.selectedPosition && currentGame.state.users[this.state.selectedPosition - 1] &&
                <div>
                  <PlayerRole user={currentGame.state.users[this.state.selectedPosition - 1]} toggleRole={false} />
                  <div className="d-flex flex-column">
                    <ButtonGroup key={currentGame.state.users[this.state.selectedPosition - 1].gameUserId} className="mt-3">
                      <Button disabled={1 === currentGame.state.users[this.state.selectedPosition - 1].position} onClick={(e) => this.selectItem(e)} data-targetposition={currentGame.state.users[this.state.selectedPosition - 1].position - 1}>Prev</Button>
                      <Button disabled={currentGame.state.users.length === currentGame.state.users[this.state.selectedPosition - 1].position} onClick={(e) => this.selectItem(e)} data-targetposition={currentGame.state.users[this.state.selectedPosition - 1].position + 1}>Next</Button>
                    </ButtonGroup>
                  </div>
                  {
                    // if last show night phase button
                    currentGame.state.users.length === currentGame.state.users[this.state.selectedPosition - 1].position &&
                    <div className="d-flex flex-column">
                      <ButtonGroup key={currentGame.gameId} className="mt-3">
                        <Button variant="danger">Start Night Phase</Button>
                      </ButtonGroup>
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      )}
      </Subscribe>
    )
  }
}