import React from "react";
import {Square} from "./Square";
import {Move} from "./Move";

export class Board extends React.Component {
  renderSquare(i) {
    let isHighlight = false;
    if (this.props.winnerPositions) {
      isHighlight = this.props.winnerPositions.reduce((isHighlight, position) => {
        return (isHighlight || position === i);
      }, false);
    }
    return (
      <Square
        key={i}
        value={this.props.boardState.getSymbol(Move.generateBySquareIndex(i))}
        onClick={() => this.props.onClick(i)}
        isHighlight={isHighlight}
      />
    );
  }

  render() {
    let lines = [];
    for (let row = 0; row < 3; row++) {
      let line = [];
      for (let col = 0; col < 3; col++) {
        line.push(this.renderSquare(row * 3 + col))
      }
      lines.push(<div key={row} className="board-row">{line}</div>);
    }
    return <div>{lines}</div>;
  }
}

