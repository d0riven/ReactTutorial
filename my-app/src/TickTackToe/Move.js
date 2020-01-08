// 着手
export class Move {
  // ここに手数も含まさせるべき？
  // squareのindexからrow, colを生成させるのは実装よりな感じになっているので直したほうが良さそう
  constructor(row, col, stepNumber) {
    this.row = row;
    this.col = col;
    this.stepNumber = stepNumber;
  }

  copy() {
    return new Move(this.row, this.col);
  }

  static generate(i, stepNumber) {
    return new (Math.floor(i / 3) + 1, (i % 3) + 1, stepNumber);
  }
}
