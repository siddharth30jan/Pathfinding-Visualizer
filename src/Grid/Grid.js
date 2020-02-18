import React, { useState, useEffect } from "react";
import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 12;
const FINISH_NODE_ROW = 40;
const FINISH_NODE_COL = 12;
const Grid = () => {
  const [grid, fGrid] = useState([]);
  const [gridCopy, fGridCopy] = useState([]);
  const [press, fPress] = useState(false);
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

  const onMouseDown = (row, col) => {
    //turn it into black
    fPress(true);
    let X = grid.slice(0);
    X[row][col].isWall = true;
    fGrid(X);
    fGridCopy(X);
  };
  const onMouseEnter = (row, col) => {
    //turn it into black
    if (!press) return;
    let X = grid.slice(0);
    X[row][col].isWall = true;
    fGrid(X);
    fGridCopy(X);
  };
  const onMouseUp = (row, col) => {
    //turn it into black
    fPress(false);
  };

  const animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `node node-final`;
      }, i * 5);
    }
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
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
        <div style={{ marginLeft: "100px", width: "600px" }}>
          <div
            style={{
              padding: "10px",
              color: "black",
              height: "100px",
              weight: "100%",
              border: "3px solid black",
              cursor: "pointer",
              background: "blue"
            }}
            onClick={e => {
              createDijikstra();
            }}
          >
            <h1>GO DIJKSTRA!</h1>
          </div>
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
                      onMouseDown={onMouseDown}
                      onMouseEnter={onMouseEnter}
                      onMouseUp={onMouseUp}
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
