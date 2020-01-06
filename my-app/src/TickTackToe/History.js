// 着手の履歴
export class History {
  // TODO: square -> boardState
  // TODO: position -> move
  constructor(squares, position) {
    this._squares = squares;
    this._position = position;
  }

  getBoardState() {
    return this._squares.slice();
  }

  getMove() {
    return Object.assign({}, this._position);
  }
}

// 着手の履歴一覧
export class HistoryList {
  constructor(histories = null) {
    if (histories == null) {
      this._histories = [new History(
        Array(9).fill(null),
        Array(9).fill(null),
      )];
    } else {
      this._histories = histories;
    }
  }

  addHistory(history) {
    return new HistoryList(this._histories.concat([history]));
  }

  getUntilStep(stepNumber) {
    return new HistoryList(this._histories.slice(0, stepNumber + 1));
  }

  currentHistory(stepNumber = null) {
    if (stepNumber) {
      return this._histories[stepNumber];
    }
    return this._histories[this._histories.length - 1];
  }

  toArray() {
    return this._histories.slice();
  }

  count() {
    return this._histories.length;
  }
}
