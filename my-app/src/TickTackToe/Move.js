// 着手
export class Move {
  // ここに手数も含まさせるべき？
  // squareのindexからrow, colを生成させるのは実装よりな感じになっているので直したほうが良さそう
  constructor(i) {
    this.row = Math.floor(i / 3) + 1;
    this.col = (i % 3) + 1;
  }

  copy() {
    return new Move((this.row - 1) * 3 + (this.col - 1));
  }
}
