import React from "react";

// マス目
export function Square(props) {
  return (
    <button
      className={props.isHighlight ? "square square-highlight" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
