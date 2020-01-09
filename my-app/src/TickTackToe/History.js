
// 着手の履歴
export class History {
  // TODO: square -> boardState
  constructor(squares, move, stepNumber) {
    this._squares = squares;
    this._move = move;
    this.stepNumber = stepNumber;
  }

  getBoardState() {
    return this._squares.slice();
  }

  getMove() {
    return this._move.copy();
  }

  isNextFirstTurn() {
    return this.stepNumber % 2 === 1;
  }

  getNextTurn() {
    return this.isNextFirstTurn() ? 'X' : 'O';
  }

  isCurrentStep(currentStep) {
    return this.stepNumber === currentStep;
  }

  isFirstHistory() {
    return this.stepNumber === 1;
  }

  clone() {
    return new History(this._squares, this._move, this.stepNumber);
  }
}

const firstHistory = new History(
  Array(9).fill(null),
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
  }

  addHistory(history) {
    return new HistoryList(this._histories.concat([history]));
  }

  getUntilBySelectedHistory(history) {
    return new HistoryList(this._histories.slice(0, history.stepNumber));
  }

  currentHistory() {
    return this._histories[this.count() - 1].clone();
  }

  toArray() {
    return this._histories.slice();
  }

  count() {
    return this._histories.length;
  }
}
