import {BoardState} from "./BoardState";

// 着手の履歴
export class History {
  // TODO: validation
  constructor(boardState, move, stepNumber) {
    this._boardState = boardState;
    this._move = move;
    this.stepNumber = stepNumber;
  }

  getBoardState() {
    return this._boardState.clone();
  }

  getMove() {
    return this._move.clone();
  }

  getNextTurnSymbol() {
    return this._isNextFirstTurn() ? 'X' : 'O';
  }

  isFirstHistory() {
    return this.stepNumber === 1;
  }

  clone() {
    return new History(this._boardState, this._move, this.stepNumber);
  }

  _isNextFirstTurn() {
    return this.stepNumber % 2 === 1;
  }
}

const firstHistory = new History(
  new BoardState(Array(9).fill(null)),
  null,
  1,
);

// 着手の履歴一覧
export class HistoryList {
  constructor(histories = null) {
    if (histories == null) {
      this._histories = [firstHistory.clone()];
    } else {
      this._histories = histories;
    }
    this._selectedStep = null;
  }

  selectHistory(history) {
    let h = new HistoryList(this._histories);
    h._selectedStep = history.stepNumber;
    return h;
  }

  addHistory(history) {
    if (this._selectedStep === null) {
      return new HistoryList(this._histories.concat([history]));
    }
    return new HistoryList(this._histories.slice(0, this._selectedStep).concat([history]));
  }

  isCurrentHistory(history) {
    return this.currentHistory().stepNumber === history.stepNumber;
  }

  currentHistory() {
    if (this._selectedStep === null) {
      return this._histories[this.count() - 1].clone();
    }
    return this._histories[this._selectedStep - 1].clone();
  }

  toArray() {
    return this._histories.slice();
  }

  count() {
    return this._histories.length;
  }
}
