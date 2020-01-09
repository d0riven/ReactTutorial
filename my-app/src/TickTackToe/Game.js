import React from "react";
import {Board} from "./Board";
import {HistoryList, History} from "./History";
import {Move} from "./Move";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: new HistoryList(),
      orderIsAsc: true,
    };
  }

  flipOrder() {
    this.setState({
      orderIsAsc: !this.state.orderIsAsc,
    })
  }

  handleClick(i) {
    const historyList = this.state.historyList;
    const current = historyList.currentHistory();
    const squares = current.getBoardState();
    const move = Move.generateSquareByIndex(i);

    // 既に勝利している場合 or マス目が埋まっている場合は何もしない
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = current.getNextTurn();
    this.setState({
      historyList: historyList.addHistory(new History(
        squares,
        move,
        current.stepNumber + 1,
        current.getNextTurn(),
      )),
    });
  }

  jumpTo(selectedHistory) {
    this.setState({
      historyList: this.state.historyList.getUntilBySelectedHistory(selectedHistory)
    });
  }


  render() {
    const historyList = this.state.historyList;
    const current = historyList.currentHistory();
    const winner = calculateWinner(current.getBoardState());

    // TODO: historyListの中身を隠蔽しつつ、他のクラスにこの処理を委譲したい
    const moves = historyList.toArray().map((history, step) => {
      const description = history.isFirstHistory() ?
        'Go to game start' :
      `Go to step #${step} (col: ${history.getMove().col}, row: ${history.getMove().row})`;

      if (history.isCurrentStep(this.state.stepNumber)) {
        return (
          <li key={step}>
            <button onClick={() => this.jumpTo(history)}><b>{description}</b></button>
          </li>
        );
      }
      return (
        <li key={step}>
          <button onClick={() => this.jumpTo(history)}>{description}</button>
        </li>
      );
    });
    // TODO: orderMoves -> sortedMoves
    const orderMoves = this.state.orderIsAsc ? moves : moves.reverse();

    const status = this._status(winner, current);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.getBoardState()}
            onClick={(i) => this.handleClick(i)}
            winnerPositions={winner ? winner.positions : null}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <p>
              <button onClick={() => this.flipOrder()}>
                history list order: {this.state.orderIsAsc ? 'desc' : 'asc'}
              </button>
            </p>
            <ol>{orderMoves}</ol>
          </div>
        </div>
      </div>
    );
  }

  _status(winner, history) {
    if (winner) {
      return 'Winner: ' + winner.mark;
    }
    // TODO: use const
    if (this.state.stepNumber === 9) {
      return 'Draw';
    }

    return 'Next player: ' + history.getNextTurn();
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