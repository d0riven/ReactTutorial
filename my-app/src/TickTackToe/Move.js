// 着手
export class Move {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  clone() {
    return new Move(this.row, this.col);
  }

  static generateBySquareIndex(i) {
    return new Move(Math.floor(i / 3) + 1, (i % 3) + 1);
  }
}