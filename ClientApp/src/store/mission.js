import { Container } from 'unstated';
import HttpUtil from './http-util';
export const GAME_ENDPOINT = '/api/missions';

class MissionContainer extends Container {
    state = {
      selectedUserIds: [],
      activeMissionPosition: 1,
      leaderPosition: 1,
    }

    runMission = () => {
      // The going on mission part
      // probably update mission status
      // add users to mission
      // show users selection screen
      // resolve mission status
      // end mission
    }

    // this is copied from user container
    // smells a bit could move somewhere to keep it dry
    selectMissionUser = async (userId) => {
      if (this.isUserSelected(userId)) {
        // remove if it's included alread for toggling
        await this.setState({
          ...this.state,
          selectedUserIds: this.state.selectedUserIds.filter(id => id !== userId)
        });
  
        return;
      }
  
      // add user otherwise
      await this.setState({
        ...this.state,
        selectedUserIds: this.state.selectedUserIds.concat([userId])
      });
    }

    isUserSelected = (userId) => {
      return this.state.selectedUserIds.includes(userId);
    }

    incrementLeaderPosition(gameUsers) {
      const updatedState = { ...this.state };

      // last user in the set need to reset the leader 1
      if (this.state.leaderPosition === gameUsers.length) {
        updatedState.leaderPosition = 1
      }
      else {
        updatedState.leaderPosition++;
      }

      this.setState(updatedState);
    }
}

let missionContainerInstance;

export default function getMissionContainerInstance() {
  if (!missionContainerInstance) {
    missionContainerInstance = new MissionContainer();
  }

  return missionContainerInstance;
}