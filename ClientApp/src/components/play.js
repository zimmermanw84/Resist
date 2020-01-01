import React, { Component } from 'react';
import getCurrentGameContainerInstance from "../store/current-game";
import { Provider, Subscribe } from 'unstated';
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap';

const currentGameContainer = getCurrentGameContainerInstance();


const AddGameUserMissionList = ({users, missionId}) => {
  return (
    <div>
      {users && users.map((user, i) => {
        return (
          <div className="mt-3" key={user.gameUserId}>
            <ListGroup as="ul">
              <ListGroup.Item as="li" active={false}>
                {user.user.username}
              </ListGroup.Item>
            </ListGroup>
          </div>
        )
      })}
    </div>
  )
}


const Mission = ({users, mission}) => {
  return (
    <AddGameUserMissionList users={users} missionId={mission.missionId}/>
  )
};


export default class Play extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      activeMission: 1,
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    // load inital state
    if (!currentGameContainer.isLoaded) {
      await currentGameContainer.getCurrentGame(id);
    }
  }

  render() {
    // eventKey={this.state.activeMission === mission.missionNumber ? "1" : "0"}>
    return (
      <div>
        <Provider>
          <div>
            <Subscribe to={[ currentGameContainer ]}>
              {(currentGame) => (
                <div>
                { currentGame.state.missions.length && currentGame.state.missions.map(mission => {
                  return (
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle as={Button} variant="info" eventKey={(this.state.activeMission === mission.missionNumber) ? "0" : "1"}>
                          Mission #{mission.missionNumber} - Player Count ({currentGame.state.config[`userCountMission${mission.missionNumber}`]}) {String(this.state.activeMission === mission.missionNumber)}
                        </Accordion.Toggle>
                        <Accordion.Collapse disable={this.state.activeMission !== mission.missionNumber} eventKey={(this.state.activeMission === mission.missionNumber) ? "0" : "1"}>
                        <Card.Body>
                          <Mission users={currentGame.state.users} mission={mission} />
                        </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  )
                })
                }
                </div>
              )}
            </Subscribe>
          </div>
        </Provider>
      </div>
    )
  }
}