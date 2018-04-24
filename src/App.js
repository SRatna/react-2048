import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    gameState: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  };

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  handleMotion = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowRight') {
      console.log('>');
    }
    if (e.key === 'ArrowLeft') {
      console.log('<');

    }
    if (e.key === 'ArrowUp') {
      console.log('^');
    }
    if (e.key === 'ArrowDown') {
      console.log('v');
    }
  };

  mutateGameState = (i, j, value) => {
    const currentGameState = this.state.gameState;
    currentGameState[i][j] = value;
    this.setState({
      gameState: currentGameState
    })
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleMotion);
    this.mutateGameState(this.getRandomInt(4), this.getRandomInt(4), 2);
    this.mutateGameState(this.getRandomInt(4), this.getRandomInt(4), 2);
  }

  render() {
    const { gameState } = this.state;
    return (
      <div>
        <div className="header">
          2048 Game
        </div>
        <div className="playground">
          {[0, 1, 2, 3].map(i => {
            return [0, 1, 2, 3].map(j => (
              <span key={j}>
                {gameState[i][j] > 0 ? gameState[i][j] : ''}
              </span>
            ))
          })}
        </div>
      </div>
    );
  }
}

export default App;
