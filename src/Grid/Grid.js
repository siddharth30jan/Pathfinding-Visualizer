import React, { useState, useEffect } from "react";
import Node from "./Node";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 35;
const FINISH_NODE_COL = 25;
const Grid = () => {
  const [grid, fGrid] = useState([]);
  useEffect(() => {
    const vGrid = [];
    for (let i = 1; i <= 50; i++) {
      const xGrid = [];
      for (let j = 1; j <= 50; j++) {
        const node = {
          row: i,
          col: j,
          isStart: i == START_NODE_ROW && j == START_NODE_COL,
          isFinish: i == FINISH_NODE_ROW && j == FINISH_NODE_COL,
          isVisited: false,
          distance: Infinity,
          isWall: false,
          previousNodes: null
        };
        xGrid.push(node);
      }
      vGrid.push(xGrid);
    }
    fGrid(vGrid);
  }, []);
  if (grid.length == 0) return <div></div>;
  else {
    //console.log(grid);
    return (
      <div style={{ display: "flex" }}>
        {grid.map(x => {
          return (
            <div>
              {x.map(y => {
                //console.log(y);
                const { row, col, isFinish, isStart, isWall } = y;
                return (
                  <Node
                    row={row}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
};

export default Grid;
