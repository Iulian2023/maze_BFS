# maze_BFS: Pathfinding in a Custom Map

This project implements a pathfinding algorithm (BFS) to determine the shortest path between a start point (`S`) and an endpoint (`E`) in a custom map. The map is represented as a string, where specific symbols denote different types of terrain.

## Features

- Parses a map string into a grid representation.
- Finds specific positions (`S` for start, `E` for end) in the map.
- Computes the shortest path from the start to the endpoint using a breadth-first search algorithm.
- Outputs the shortest path in a formatted string.

## Symbols in the Map

The map uses the following symbols:
- `.`: Open path (value: `0`)
- `o`: Obstacle/wall (value: `-1`)
- `S`: Start point (value: `-2`)
- `E`: Endpoint (value: `-3`)

## How to Use

### Prerequisites
- Node.js installed on your system.

### Run the Program

- To run the program use `ts-node main.ts map/file.map` + one map file 