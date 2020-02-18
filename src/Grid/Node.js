import React, { useState, useEffect } from "react";

const style = {
  width: "25px",
  height: "25px",
  outline: "1px solid rgb(175, 216, 248)",
  display: "inline-block"
};
const Node = ({ row, col, isFinish, isStart, isWall, isVisited }) => {
  let temp = "white";
  if (isStart) temp = "green";
  else if (isFinish) temp = "red";
  else if (isVisited) temp = "orange";
  else if (isWall) temp = "black";
  const style1 = {
    ...style,
    backgroundColor: temp
  };
  return <div style={style1}></div>;
};

export default Node;
