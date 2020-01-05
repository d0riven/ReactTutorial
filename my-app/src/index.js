import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={props.isHighlight ? "square square-highlight" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let isHighlight = false;
    if (this.props.winnerPositions) {
      isHighlight = this.props.winnerPositions.reduce((isHighlight, position) => {
        return (isHighlight || position === i);
      }, false);
    }
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlight={isHighlight}
      />
    );
  }

  render() {
    let lines = [];
    for (let row = 0; row < 3; row++) {
      let line = [];
      for (let col = 0; col < 3; col++) {
        line.push(this.renderSquare(row * 3 + col))
      }
      lines.push(<div key={row} className="board-row">{line}</div>);
    }
    return <div>{lines}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      orderIsAsc: true,
    };
  }

  flipOrder() {
    this.setState({
      orderIsAsc: !this.state.orderIsAsc,
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const position = {
      col:  Math.floor(i / 3) + 1,
      row: (i % 3) + 1,
    };

    // 既に勝利している場合 or マス目が埋まっている場合は何もしない
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        position: position,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((move, step) => {
      const isCurrent = this.state.stepNumber === step;
      const description = step ?
        `Go to step #${step} (col: ${move.position.col}, row: ${move.position.row})` :
        'Go to game start';

      if (isCurrent) {
         return (
           <li key={step}>
             <button onClick={() => this.jumpTo(step)}><b>{description}</b></button>
           </li>
         );
      }
      return (
        <li key={step}>
          <button onClick={() => this.jumpTo(step)}>{description}</button>
        </li>
      );
    });
    const orderMoves = this.state.orderIsAsc ? moves : moves.reverse();

    let status;
    if (winner) {
      status = 'Winner: ' + winner.mark;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerPositions={winner ? winner.positions : null}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <p>
              <button onClick={() => this.flipOrder()}>
                history order: {this.state.orderIsAsc ? 'desc' : 'asc'}
              </button>
            </p>
            <ol>{orderMoves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // cross
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        mark: squares[a],
        positions: [a, b, c],
      }
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
