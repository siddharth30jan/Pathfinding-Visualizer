import React, { useState, useEffect } from "react";
import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Dijikstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 15;
const Grid = () => {
  const [grid, fGrid] = useState([]);
  const [gridCopy, fGridCopy] = useState([]);
  useEffect(() => {
    const vGrid = [];
    const cGrid = [];
    for (let i = 0; i < 50; i++) {
      const xGrid = [];
      const cxGrid = [];
      for (let j = 0; j < 50; j++) {
        const node = {
          row: i,
          col: j,
          isStart: i == START_NODE_ROW && j == START_NODE_COL,
          isFinish: i == FINISH_NODE_ROW && j == FINISH_NODE_COL,
          isVisited: false,
          distance: Infinity,
          isWall: false,
          previousNode: null
        };
        const node1 = {
          row: i,
          col: j,
          isStart: i == START_NODE_ROW && j == START_NODE_COL,
          isFinish: i == FINISH_NODE_ROW && j == FINISH_NODE_COL,
          isVisited: false,
          distance: Infinity,
          isWall: false,
          previousNode: null
        };
        xGrid.push(node);
        cxGrid.push(node1);
      }
      vGrid.push(xGrid);
      cGrid.push(cxGrid);
    }
    fGrid(vGrid);
    fGridCopy(cGrid);
  }, []);
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    //fGrid(gridCopy);

    for (let node of visitedNodesInOrder) {
      setTimeout(() => {
        let X = grid.slice(0);
        X[node.row][node.col] = node;
        fGrid(X);
      }, 5);
    }
  };
  const createDijikstra = () => {
    // console.log("old real", grid[START_NODE_ROW - 1][START_NODE_COL - 1]);

    const startNode = gridCopy[START_NODE_ROW][START_NODE_COL];
    const finishNode = gridCopy[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(gridCopy, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    console.log(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  if (grid.length == 0) return <div></div>;
  else {
    //console.log(grid);
    return (
      <div>
        <div style={{ marginLeft: "100px" }}>
          <button
            style={{
              color: "blue",
              height: "50px",
              weight: "50px",
              border: "3px solid black",
              cursor: "pointer"
            }}
            onClick={e => {
              createDijikstra();
            }}
          >
            GO DIJIKSTRA!
          </button>
        </div>
        <div style={{ display: "flex", marginLeft: "100px" }}>
          {grid.map(x => {
            return (
              <div>
                {x.map(y => {
                  //console.log(y);
                  const { row, col, isFinish, isStart, isWall, isVisited } = y;
                  return (
                    <Node
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isVisited={isVisited}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Grid;
