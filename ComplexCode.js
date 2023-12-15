/* 
Filename: ComplexCode.js 
Content: A complex JavaScript code that generates a random maze through Prim's Algorithm and then finds the shortest path using Dijkstra's Algorithm.
*/

// Define necessary classes
class Node {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.visited = false;
    this.neighbors = [];
    this.distance = Infinity;
    this.previous = null;
  }
}

class Maze {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = [];
    this.startNode = null;
    this.endNode = null;
    this.initialize();
  }

  initialize() {
    // Create a grid of nodes
    for (let row = 0; row < this.rows; row++) {
      let rowArray = [];
      for (let col = 0; col < this.columns; col++) {
        rowArray.push(new Node(row, col));
      }
      this.grid.push(rowArray);
    }

    // Connect nodes with appropriate neighbors
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        let currentNode = this.grid[row][col];
        let neighbors = [];

        if (row > 0) neighbors.push(this.grid[row - 1][col]);
        if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]);
        if (col > 0) neighbors.push(this.grid[row][col - 1]);
        if (col < this.columns - 1) neighbors.push(this.grid[row][col + 1]);

        currentNode.neighbors = neighbors;
      }
    }

    // Set random start and end nodes
    this.startNode = this.grid[0][0];
    this.endNode = this.grid[this.rows - 1][this.columns - 1];
  }

  generateMaze() {
    // Implementation of Prim's Algorithm
    let stack = [];
    let visitedNodes = new Set();
    let currentNode = this.startNode;
    visitedNodes.add(currentNode);

    while (visitedNodes.size < this.rows * this.columns) {
      let unvisitedNeighbors = currentNode.neighbors.filter(
        (neighbor) => !visitedNodes.has(neighbor)
      );

      if (unvisitedNeighbors.length > 0) {
        let randomNeighbor =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];
        visitedNodes.add(randomNeighbor);
        stack.push(currentNode);
        currentNode = randomNeighbor;
      } else if (stack.length > 0) {
        currentNode = stack.pop();
      }
    }
  }

  findShortestPath() {
    // Implementation of Dijkstra's Algorithm
    let unvisitedNodes = [];
    this.grid.forEach((row) => {
      row.forEach((node) => {
        unvisitedNodes.push(node);
      });
    });

    this.startNode.distance = 0;

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      let closestNode = unvisitedNodes.shift();

      if (closestNode.distance === Infinity) break;

      for (let neighbor of closestNode.neighbors) {
        let tentativeDistance = closestNode.distance + 1;
        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance;
          neighbor.previous = closestNode;
        }
      }
    }

    // Generate shortest path by backtracking from end node
    let shortestPath = [];
    let current = this.endNode;
    while (current.previous) {
      shortestPath.unshift(current);
      current = current.previous;
    }
    shortestPath.unshift(this.startNode);

    return shortestPath;
  }
}

// Usage example
const maze = new Maze(10, 10);
maze.generateMaze();
console.log("Randomly generated maze:");
console.log(maze.grid); // Print the generated maze
console.log("Finding shortest path using Dijkstra's Algorithm:");
console.log(maze.findShortestPath()); // Print the shortest path from start to end node

// Additional functionalities can be added as per requirements