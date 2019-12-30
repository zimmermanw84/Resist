import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import getCurrentGameContainerInstance from "../store/current-game";
import { Redirect } from "react-router-dom";

const currentGameContainer = getCurrentGameContainerInstance();

export default class NightPhase extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      audioComplete: false,
    }
  }

  addCompleteEvent() {
    const [ $audioEl ] = document.getElementsByTagName('audio');
    if ($audioEl) {
      $audioEl.addEventListener('ended', this.onAudioComplete.bind(this));
    }
  }

  componentWillUnmount() {
    const [ $audioEl ] = document.getElementsByTagName('audio');
    if ($audioEl) {
      $audioEl.removeEventListener('ended', this.onAudioComplete);
    }
  }

  onAudioComplete() {
    currentGameContainer.completeNightPhase();
    this.setState({ ...this.state, audioComplete: true })
  }

  render() {
    return (
      <Subscribe to={[currentGameContainer]}>
        {(currentGame) => (
          <div>
          {this.state.audioComplete &&
            <Redirect to={`/game/${currentGame.state.game.gameId}/play`}/>
          }
          {currentGame.state.showNightPhase &&
            <div>
              NightPhase
              <audio onPlaying={() => this.addCompleteEvent()} autoPlay>
                <source src="/night-phase.mp3" type="audio/mp3" />
              </audio>
            </div>
          }
          </div>
        )}
      </Subscribe>
    )
  }
}