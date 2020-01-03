import React, { Component } from 'react';
import getCurrentGameContainerInstance from "../store/current-game";
import getMissionContainerInstance from "../store/mission";
import { Provider, Subscribe } from 'unstated';
import { Accordion, Card, Button, Badge } from 'react-bootstrap';

const currentGameContainer = getCurrentGameContainerInstance();
const missionContainer = getMissionContainerInstance();

const AddGameUserMissionList = ({users, missionId, playerCount}) => {
  const selectMissionUser = (e, missionContainer) => {
    const { userid } =  e.currentTarget.dataset;

    missionContainer.selectMissionUser(Number(userid), missionId);
  }

  return (
    <Subscribe to={[ missionContainer ]}>
      {(missionCont) => (
        <ul style={{listStyle: "none", padding: "0"}}>
          {users && users.map((user) => {
            return (
              <li className="mb-3 d-flex flex-column">
                <Button
                  key={user.userId}
                  variant={missionCont.isUserSelected(user.userId) ? "primary" : "light"}
                  size="lg"
                  onClick={(e) => selectMissionUser(e, missionCont)}
                  data-userid={user.userId}
                  disabled={missionCont.state.selectedUserIds.length === playerCount && !missionCont.isUserSelected(user.userId)}
                >
                  {user.user.username}
                  {user.position === missionCont.state.leaderPosition &&
                    <Badge className="ml-3" variant="success">Leader</Badge>
                  }
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </Subscribe>
  )
}


const Mission = ({users, mission, activeMissionNumber, playerCount}) => {
  // we want pending missions / spy won / resistance won to all be different color
  const getHeaderStyle = (mission) => {
    let variant;

    if (mission.status === "Pending") {
      variant = "info";
    }
    else if (mission.status === "Failure") {
      variant = "danger";
    }
    else if (mission.status === "Success") {
      variant = "primary";
    }

    return variant;
  }

  return (
      <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle
          as={Button}
          variant={getHeaderStyle(mission)}
          eventKey={(activeMissionNumber === mission.missionNumber) ? "0" : "1"}
          disabled={activeMissionNumber !== mission.missionNumber}
        >
          Mission #{mission.missionNumber} - Player Count ({playerCount})
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={(activeMissionNumber === mission.missionNumber) ? "0" : "1"}>
        <Card.Body>
          <AddGameUserMissionList users={users} missionId={mission.missionId} playerCount={playerCount}/>
        </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
};


export default class Play extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      activeMissionNumber: 1,
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
    return (
      <div>
        <Provider>
          <div>
            <Subscribe to={[ currentGameContainer ]}>
              {(currentGame) => (
                <div>
                { currentGame.state.missions.length && currentGame.state.missions.map(mission => {
                  return (
                    <Mission
                      users={currentGame.state.users}
                      mission={mission}
                      activeMissionNumber={this.state.activeMissionNumber}
                      playerCount={currentGame.state.config[`userCountMission${mission.missionNumber}`]}
                    />
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