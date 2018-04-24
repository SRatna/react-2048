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

  componentDidMount() {
    window.addEventListener('keydown', this.handleMotion);
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
              <span key={j}>{gameState[i][j]}</span>
            ))
          })}
        </div>
      </div>
    );
  }
}

export default App;
