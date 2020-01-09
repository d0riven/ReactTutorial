// 着手
export class Move {
  // ここに手数も含まさせるべき？
  // squareのindexからrow, colを生成させるのは実装よりな感じになっているので直したほうが良さそう
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  copy() {
    return new Move(this.row, this.col);
  }

  static generateSquareByIndex(i) {
    return new Move(Math.floor(i / 3) + 1, (i % 3) + 1);
  }
}