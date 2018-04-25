import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    gameState: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    gameOver: false,
    gameWon: false
  };

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  
  isGameOverOnColumns = () => {
    const { gameState } = this.state;
    let colIndex = 0;
    const gameOverArray = [];
    while (colIndex < 4) {
      let gameOver = true;
      let rowIndex = 0;
      while (rowIndex < 3) {
        if (gameState[rowIndex][colIndex] === gameState[rowIndex + 1][colIndex]) {
          gameOver = false;
          break;
        }
        rowIndex += 1;
      }
      gameOverArray.push(gameOver);
      colIndex += 1;
    }
    return gameOverArray[0] && gameOverArray[1] && gameOverArray[2] && gameOverArray[3];
  };
  
  isGameOverOnRows = () => {
    const { gameState } = this.state;
    let rowIndex = 0;
    const gameOverArray = [];
    while (rowIndex < 4) {
      let gameOver = true;
      let colIndex = 0;
      while (colIndex < 3) {
        if (gameState[rowIndex][colIndex] === gameState[rowIndex][colIndex + 1]) {
          gameOver = false;
          break;
        }
        colIndex += 1;
      }
      gameOverArray.push(gameOver);
      rowIndex += 1;
    }
    return gameOverArray[0] && gameOverArray[1] && gameOverArray[2] && gameOverArray[3];
  };

  checkForGameOver = () => {
    if (this.getEmptyLocations(this.state.gameState).length === 0) {
      if (this.isGameOverOnRows() && this.isGameOverOnColumns()) {
        this.setState({ gameOver: true });
      }
    }
  };

  checkForGameWon = gameState => {
    let rowIndex = 0;
    let gameWon = false;
    while (rowIndex < 4) {
      let colIndex = 0;
      while (colIndex < 4) {
        if (gameState[rowIndex][colIndex] === 2048) {
          gameWon = true;
          break;
        }
        colIndex += 1;
      }
      if (gameWon) break;
      rowIndex += 1;
    }
    if (gameWon) {
      this.setState({
        gameWon: true
      });
    }
  };

  handleMotion = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowRight') {
      this.checkForGameOver();
      this.handleRightArrowClick();
    }
    if (e.key === 'ArrowLeft') {
      this.checkForGameOver();
      this.handleLeftArrowClick();
    }
    if (e.key === 'ArrowUp') {
      this.checkForGameOver();
      this.handleUpArrowClick();
    }
    if (e.key === 'ArrowDown') {
      this.checkForGameOver();
      this.handleDownArrowClick();
    }
  };

  mutateGameState = (i, j, value) => {
    this.setState(prevState => {
      const prevGameState = prevState.gameState;
      prevGameState[i][j] = value;
      return {
        gameState: prevGameState
      };
    })
  };

  reorderItems = array => {
    let i = array.length;
    while (i > 0) {
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

  performAddition = array => {
    const reorderedArray = this.reorderItems(array);
    let i = reorderedArray.length - 1;
    while (i > 0) {
      if (reorderedArray[i] === reorderedArray[i - 1]) {
        reorderedArray[i] = reorderedArray[i] * 2;
        reorderedArray[i - 1] = 0;
        return this.reorderItems(reorderedArray);
      }
      i -= 1;
    }
    return reorderedArray;
  };

  getEmptyLocations = gameState => {
    const emptyLocations = [];
    let rowIndex = 0;
    while (rowIndex < 4) {
      let colIndex = 0;
      while (colIndex < 4) {
        if (gameState[rowIndex][colIndex] === 0) {
          emptyLocations.push({
            rowIndex, colIndex
          });
        }
        colIndex += 1;
      }
      rowIndex += 1;
    }
    return emptyLocations;
  };

  putTwoAtARandomEmptyLocation = () => {
    const emptyLocations = this.getEmptyLocations(this.state.gameState);
    if (emptyLocations.length > 0) {
      const randomIndex = this.getRandomInt(emptyLocations.length);
      const randomLocation = emptyLocations[randomIndex];
      this.mutateGameState(randomLocation.rowIndex, randomLocation.colIndex, 2);
    }
  };

  putTwoAtTwoRandomEmptyLocations = () => {
    const i1 = this.getRandomInt(4);
    const j1 = this.getRandomInt(4);
    let i2 = this.getRandomInt(4);
    let j2 = this.getRandomInt(4);
    while (true) {
      if (i1 !== i2 && j1 !== j2) break;
      i2 = this.getRandomInt(4);
      j2 = this.getRandomInt(4);
    }
    this.mutateGameState(i1, j1, 2);
    this.mutateGameState(i2, j2, 2);
  };

  handleDownArrowClick = () => {
    const { gameState } = this.state;
    let colIndex = 0;
    while (colIndex < 4) {
      let rowIndex = 0;
      const colArray = [];
      while (rowIndex < 4) {
        colArray.push(gameState[rowIndex][colIndex]);
        rowIndex += 1;
      }
      const newColArray = this.performAddition(colArray);
      rowIndex = 0;
      while (rowIndex < 4) {
        gameState[rowIndex][colIndex] = newColArray[rowIndex];
        rowIndex += 1;
      }
      colIndex += 1;
    }
    this.checkForGameWon(gameState);
    this.setState({ gameState });
    this.putTwoAtARandomEmptyLocation();
  };

  handleUpArrowClick = () => {
    const { gameState } = this.state;
    let colIndex = 0;
    while (colIndex < 4) {
      let rowIndex = 3;
      const colArray = [];
      while (rowIndex >= 0) {
        colArray.push(gameState[rowIndex][colIndex]);
        rowIndex -= 1;
      }
      const newColArray = this.performAddition(colArray);
      rowIndex = 3;
      while (rowIndex >= 0) {
        gameState[rowIndex][colIndex] = newColArray[3 - rowIndex];
        rowIndex -= 1;
      }
      colIndex += 1;
    }
    this.checkForGameWon(gameState);
    this.setState({ gameState });
    this.putTwoAtARandomEmptyLocation();
  };

  handleRightArrowClick = () => {
    const { gameState } = this.state;
    let rowIndex = 0;
    while (rowIndex < 4) {
      let colIndex = 0;
      const rowArray = [];
      while (colIndex < 4) {
        rowArray.push(gameState[rowIndex][colIndex]);
        colIndex += 1;
      }
      const newRowArray = this.performAddition(rowArray);
      colIndex = 0;
      while (colIndex < 4) {
        gameState[rowIndex][colIndex] = newRowArray[colIndex];
        colIndex += 1;
      }
      rowIndex += 1;
    }
    this.checkForGameWon(gameState);
    this.setState({ gameState });
    this.putTwoAtARandomEmptyLocation();
  };

  handleLeftArrowClick = () => {
    const { gameState } = this.state;
    let rowIndex = 0;
    while (rowIndex < 4) {
      let colIndex = 3;
      const rowArray = [];
      while (colIndex >= 0) {
        rowArray.push(gameState[rowIndex][colIndex]);
        colIndex -= 1;
      }
      const newRowArray = this.performAddition(rowArray);
      colIndex = 3;
      while (colIndex >= 0) {
        gameState[rowIndex][colIndex] = newRowArray[3 - colIndex];
        colIndex -= 1;
      }
      rowIndex += 1;
    }
    this.checkForGameWon(gameState);
    this.setState({ gameState });
    this.putTwoAtARandomEmptyLocation();
  };

  resetGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      gameOver: false,
      gameWon: false
    });
    this.putTwoAtTwoRandomEmptyLocations();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleMotion);
    this.putTwoAtTwoRandomEmptyLocations();
  }

  render() {
    const { gameState, gameOver, gameWon } = this.state;
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
        <div className="footer">
          {gameOver && <span>Game Over</span>}
          {gameWon && <span>Game Won</span>}
          <br/>
          <button onClick={this.resetGame}>
            New Game
          </button>
        </div>
      </div>
    );
  }
}

export default App;
