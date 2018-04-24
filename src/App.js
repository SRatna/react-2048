import React, { Component } from 'react';
import './App.css';

class App extends Component {

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
    return (
      <div>
        <div className="header">
          2048 Game
        </div>
        <div className="playground">
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
          <span>2</span>
        </div>
      </div>
    );
  }
}

export default App;
