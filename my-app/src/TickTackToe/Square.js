import React from "react";

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