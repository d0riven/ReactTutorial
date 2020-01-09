// 盤面の状態
export class BoardState  {
  constructor(squares) {
    this._squares = squares;
  }

  mark(move, symbol) {
    return this._squares[this._toIndex(move.row, move.col)] = symbol;
  }

  isMarked(move) {
    return this.getSymbol(move) !== null;
  }

  getSymbol(move) {
    return this._squares[this._toIndex(move.row, move.col)];
  }

  getWinner() {
    const lines = [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // cross
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this._squares[a] && this._squares[a] === this._squares[b] && this._squares[a] === this._squares[c]) {
        return {
          symbol: this._squares[a],
          positions: [a, b, c],
        }
      }
    }
    return null;
  }

  clone() {
    return new BoardState(this._squares.slice());
  }

  _toIndex(row, col) {
    return (row - 1) * 3 + (col - 1);
  }
}
