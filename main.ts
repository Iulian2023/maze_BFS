const fs = require('fs');

// Define a personlised type beeing a paire of numbers. 
type Position = [number,  number]

/**
 * 
 * Return a map of numbers.
 * 
 * @param map 
 * @returns Array[][]
 */
function main(map: string): number[][] {
    const numberTab: number[][] = [];
    const symbolMap = new Map<string, number>([
        [".", 0],
        ["o", -1],
        ["S", -2],
        ["E", -3]
    ]);

    let sliceStart = 0;
    const readMap = map.split('');

    for (let i = 0; i <= readMap.length; i++) {
        // Verify if we are at the end of the string or the end of the map
        if (readMap[i] === " " || i === readMap.length) {
            // Create row converting each symbol using symbolMap
            const row = readMap.slice(sliceStart, i).map(char => symbolMap.get(char) ?? -1);
            numberTab.push(row);
            sliceStart = i + 1; // Prepare the start for the next row
        }
    }
    return numberTab;
};

class MapKart{
    constructor(private plan: number[][]){}

    /**
     * Find the exact postion of a character in a map
     * 
     * @param value 
     * @returns Position | null
     */
    private findPosition(value: number) : Position | null{
        // Loop the first dimesion array
        for (let i = 0; i < this.plan.length; i++) {
            // Search the index of a value in an two dimesion array
            const j = this.plan[i].indexOf(value);
            // if the positon is -2 (a wall) return the the array where we find the value and his position 
            if (j !== -1 ) {
                return [i,j]
            }
        }
        // If the value is not find we return null
        return null
    }

    /**
     * Return the shortest path to the end point
     * 
     * @returns path | null
     */
    public findWay() : Position[] | null{
        // Call the findPosition function to find the start and the end
        const start = this.findPosition(-2);
        const end = this.findPosition(-3);

        // If end or start can't be find we return null and stop the function
        if (!end || !start) {
            return null;
        };


        // By default we stock the starting point.  
        const queue: Array<[Position, Position[]]> = [[start, [start]]];

        // Set is a new data structure allow to stock distinct value and their position is unchangebles
        const visited = new Set<string>([start.toString()]);
        // Is vectors to search to see their values
        const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        // While the queue have a value we search if there is a posible path
        while(queue.length){

            // this constant recover the actual position and the path from the start to the actual position
            const [currentPosition, path] = queue.shift()!;
            // We stock the curent position in two variables x for the array position and y for the element position in array
            const [x, y] = currentPosition

            // Check the reach of the end point
            if (x === end[0] && y === end[1]) {
                return path;
            }

            //Loop every position around the current position
            for( const [dx, dy] of direction){
                const neighbor : Position = [dx + x, dy + y];
                const [nx, ny] = neighbor;
                // Check the boundry of map, value and the neighbor of the value
                if (nx >= 0 && nx < this.plan.length && ny >= 0 && ny < this.plan[0].length && (this.plan[nx][ny] === 0 || this.plan[nx][ny] === -3) && !visited.has(`${nx}-${ny}`)) {
                    // We add the position in visited variable
                    visited.add(`${nx}-${ny}`);
                    // Push the neighbor and his path in queue
                    queue.push([neighbor, [...path, neighbor]]);
                }
            }
        }
        return null
    }
}

let map = new MapKart(main(fs.readFileSync(process.argv[2], 'utf8')))
let way = map.findWay()!;
let shortPath : string[] = []

for (let i = 0; i < way.length; i++) {
    shortPath.push(way[i].toString().replace(/\,/, ":"))!;
}
console.log(shortPath.toString().replace(/\,/g, " "));
