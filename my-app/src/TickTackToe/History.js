// 着手の履歴
export class History {
  constructor(history = null) {
    if (history == null) {
      this._history = [{
        squares: Array(9).fill(null),
        position: Array(9).fill(null),
      }];
    } else {
      this._history = history;
    }
  }

  addMove(move) {
    return new History(this._history.concat([move]));
  }

  getUntilStep(stepNumber) {
    return new History(this._history.slice(0, stepNumber + 1));
  }

  // TODO: extract Move
  currentMove(stepNumber = null) {
    if (stepNumber) {
      return this._history[stepNumber];
    }
    return this._history[this._history.length - 1];
  }

  toArray() {
    return this._history.slice();
  }

  count() {
    return this._history.length;
  }
}
