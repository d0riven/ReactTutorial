// 着手の全履歴
export class Histories {
  constructor(histories = null) {
    if (histories == null) {
      this._histories = [{
        squares: Array(9).fill(null),
        position: Array(9).fill(null),
      }];
    } else {
      this._histories = histories;
    }
  }

  addHistory(history) {
    return new Histories(this._histories.concat([history]));
  }

  getUntilStep(stepNumber) {
    return new Histories(this._histories.slice(0, stepNumber + 1));
  }

  // TODO: extract Move
  currentMove(stepNumber = null) {
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
