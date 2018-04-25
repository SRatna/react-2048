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

  reorderItems = array => {
    console.log(array);
    let i = array.length;
    while (i > 0) {
      console.log(i);
      i -= 1;
      if (array[i] > 0) continue;
      let j = i;
      while (j > 0) {
        j -= 1;
        if (array[j] > 0) break;
      }
      array[i] = array[j];
      array[j] = 0;
    }
    return array;
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleMotion);
    this.mutateGameState(this.getRandomInt(4), this.getRandomInt(4), 2);
    this.mutateGameState(this.getRandomInt(4), this.getRandomInt(4), 2);
    const array = [0,0,2,4,0,2,0,0,8];
    console.log(this.reorderItems(array));
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
