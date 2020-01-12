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
    const boardState = current.getBoardState();
    const move = Move.generateBySquareIndex(i);

    // 既に勝利している場合 or マス目が埋まっている場合は何もしない
    if (boardState.judgement().winner || !boardState.mark(move, current.getNextTurnSymbol())) {
      return;
    }

    this.setState({
      historyList: historyList.addHistory(new History(
        boardState,
        move,
        current.stepNumber + 1,
      )),
    });
  }

  jumpTo(selectedHistory) {
    this.setState({
      historyList: this.state.historyList.selectHistory(selectedHistory)
    });
  }


  render() {
    const historyList = this.state.historyList;
    const current = historyList.currentHistory();
    const boardState = current.getBoardState();

    // TODO: historyListの中身を隠蔽しつつ、他のクラスにこの処理を委譲したい
    const moves = historyList.toArray().map((history, step) => {
      const description = history.isFirstHistory() ?
        'Go to game start' :
      `Go to step #${step} (col: ${history.getMove().col}, row: ${history.getMove().row})`;

      if (historyList.isCurrentHistory(history)) {
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

    const status = this._status(boardState, current);
    const sortedMoves = this.state.orderIsAsc ? moves : moves.reverse();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardState={boardState}
            onClick={(i) => this.handleClick(i)}
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
            <ol>{sortedMoves}</ol>
          </div>
        </div>
      </div>
    );
  }

  _status(boardState, history) {
    const result = boardState.judgement()
    if (result.winner) {
      return 'Winner: ' + result.winner.symbol;
    }
    if (result.isDraw) {
      return 'Draw';
    }

    return 'Next player: ' + history.getNextTurnSymbol();
  }
}
