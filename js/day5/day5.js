const { readFile } = require("../util/readfile");

class Coord {
  start_col = 0;
  end_col = 0;
  start_row = 0;
  end_row = 0;
  isHorizontalLine = false;
  isVerticalLine = false;
  isDiagonalForwardLine = false;
  isDiagonalBackwardLine = false;
  lineLength = 0;
  constructor(inputLine) {
    const x1 = parseInt(inputLine[0][0]);
    const x2 = parseInt(inputLine[1][0]);
    const y1 = parseInt(inputLine[0][1]);
    const y2 = parseInt(inputLine[1][1]);
    console.assert(
      !isNaN(x1) && !isNaN(x2) && !isNaN(y1) && !isNaN(y2),
      `Something failed NaN check, ${inputLine}`
    );

    this.isHorizontalLine = y1 == y2;
    this.isVerticalLine = x1 == x2;
    const isDiagonalLine = Math.abs(x1 - x2) == Math.abs(y1 - y2);
    if (isDiagonalLine) {
      this.isDiagonalForwardLine = x1 - x2 == y1 - y2;
      this.isDiagonalBackwardLine = x2 - x1 == y1 - y2;
    }

    if (
      (this.isHorizontalLine && x1 > x2) ||
      (this.isVerticalLine && y1 > y2) ||
      (this.isDiagonalForwardLine && x1 > x2) ||
      (this.isDiagonalBackwardLine && x1 > x2)
    ) {
      this.start_col = x2;
      this.end_col = x1;
      this.start_row = y2;
      this.end_row = y1;
    } else {
      this.start_col = x1;
      this.end_col = x2;
      this.start_row = y1;
      this.end_row = y2;
    }

    if (
      this.isVerticalLine ||
      this.isDiagonalForwardLine ||
      this.isDiagonalBackwardLine
    ) {
      this.lineLength = Math.abs(this.end_row - this.start_row) + 1;
    } else if (this.isHorizontalLine) {
      this.lineLength = this.end_col - this.start_col + 1;
    }
  }
}

function parseFile(file) {
  const rawInput = readFile(__dirname + file);

  return rawInput
    .split("\n")
    .map((item) => item.split(" -> ").map((entry) => entry.split(",")))
    .map((line) => new Coord(line));
}

function setupMap(ventLines) {
  const maxSize = ventLines.reduce(
    (prev, curr) => [
      Math.max(prev[0], curr.end_row),
      Math.max(prev[1], curr.end_col),
    ],
    [0, 0]
  );

  const map = [];
  const mapLine = [];
  for (let i = 0; i <= maxSize[0]; i++) {
    mapLine.push(0);
  }
  for (let i = 0; i <= maxSize[1]; i++) {
    map.push([...mapLine]);
  }
  return map;
}

function markHorizonalLines(map, ventLines) {
  const horizontalLines = ventLines.filter((line) => line.isHorizontalLine);
  horizontalLines.forEach((line) => {
    for (let i = line.start_col; i <= line.end_col; i++) {
      map[line.start_row][i]++;
    }
  });
}

function markVerticalLines(map, ventLines) {
  const verticalLines = ventLines.filter((line) => line.isVerticalLine);
  verticalLines.forEach((line) => {
    for (let i = line.start_row; i <= line.end_row; i++) {
      map[i][line.start_col]++;
    }
  });
}

function markDiagonalForwardLines(map, ventLines) {
  const diagonalForwardLines = ventLines.filter(
    (line) => line.isDiagonalForwardLine
  );
  diagonalForwardLines.forEach((line) => {
    for (let i = 0; i < line.lineLength; i++) {
      map[line.start_row + i][line.start_col + i]++;
    }
  });
}

function markDiagonalBackwardLines(map, ventLines) {
  const diagonalBackwardLines = ventLines.filter(
    (line) => line.isDiagonalBackwardLine
  );
  diagonalBackwardLines.forEach((line) => {
    for (let i = 0; i < line.lineLength; i++) {
      map[line.start_row - i][line.start_col + i]++;
    }
  });
}

function countOverlaps(map) {
  let count = 0;
  map.forEach((line) =>
    line.forEach((entry) => {
      if (entry > 1) {
        count++;
      }
    })
  );
  return count;
}

function test() {
  const testCoord = new Coord([
    ["9", "4"],
    ["3", "4"],
  ]);
  console.assert(testCoord.start_col == "3", "Start col is not correct");
  console.assert(testCoord.end_col == "9", "end col is not correct");
  console.assert(testCoord.start_row == "4", "start row is not correct");
  console.assert(testCoord.end_row == "4", "end row is not correct");
  console.assert(testCoord.isHorizontalLine, "Should be a horizontal line");
  console.assert(!testCoord.isVerticalLine, "Should not be a vertical line");

  const testFile = parseFile("/test.txt");

  console.log(testFile);

  const testMap = setupMap(testFile);

  console.assert(
    testMap.length == 10,
    "Test map was not set up with the correct length"
  );
  console.assert(
    testMap[0].length == 10,
    "Test map was not set up with the correct width"
  );

  markHorizonalLines(testMap, testFile);
  markVerticalLines(testMap, testFile);
  const overlaps = countOverlaps(testMap);
  console.assert(overlaps == 5, `Expected 5 overlaps but got ${overlaps}`);

  markDiagonalForwardLines(testMap, testFile);
  markDiagonalBackwardLines(testMap, testFile);
  const overlapsPt2 = countOverlaps(testMap);
  console.log(testMap);
  console.assert(overlapsPt2 == 12, `Expected 12 overlaps but got ${overlaps}`);

}

test();

function solve(file) {
  const entry = parseFile(file);
  const map = setupMap(entry);
  markHorizonalLines(map, entry);
  markVerticalLines(map, entry);
  markDiagonalForwardLines(map, entry);
  markDiagonalBackwardLines(map, entry);
  return countOverlaps(map);
}

function day5() {
  console.log(solve("/part1.txt"));
}

module.exports = { day5 };
