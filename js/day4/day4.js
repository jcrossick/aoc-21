const { readFile } = require("../util/readfile");

function parseFile(file) {
  const rawInput = readFile(__dirname + file);

  const rawItems = rawInput.split("\n\n");

  return {
    draw: rawItems.shift().split(","),
    boards: rawItems.map((board) =>
      board
        .split("\n")
        .map((line) => line.split(" ").filter((item) => (item ? true : false)))
    ),
  };
}

function markBoard(drawItem, board) {
  return board.map((line) =>
    line.map((item) => (item === drawItem ? "X" : item))
  );
}

function checkForWinner(board) {
  winningRows = board.filter((line) =>
    line.filter((item) => item == "X").length == 5 ? true : false
  );
  if (winningRows.length > 0) {
    return true;
  }

  let column = 0;
  for (column; column < 5; column++) {
    let row = 0;
    let markCount = 0;
    for (row; row < 5; row++) {
      if (board[row][column] == "X") {
        markCount++;
      }
    }
    if (markCount == 5) {
      return true;
    }
  }

  return false;
}

function findFirstWinner(input) {
  let winningBoards = [];
  let drawCount = 0;

  let boards = input.boards;
  while (winningBoards.length == 0) {
    boards = boards.map((board) => markBoard(input.draw[drawCount], board));
    winningBoards = boards.filter((board) => checkForWinner(board));
    drawCount++;
  }
  if (winningBoards.length > 1) {
    console.log("Was expecting a single winning board but got ", winningBoards);
  }
  return [input.draw[drawCount - 1], winningBoards[0]];
}

function findLastBoard(input) {
  let drawCount = 0;
  let boards = input.boards;
  while (boards.length > 1) {
    boards = boards
      .map((board) => markBoard(input.draw[drawCount], board))
      .filter((board) => !checkForWinner(board));
    drawCount++;
  }

  let winningBoard = boards[0];
  let hasWon = false;
  while (!hasWon) {
      winningBoard = markBoard(input.draw[drawCount], winningBoard);
      hasWon = checkForWinner(winningBoard);
      drawCount++;
  }

  return [input.draw[drawCount - 1], winningBoard];
}

function calculateWinner(winningNumber, winningBoard) {
  let sum = 0;
  winningBoard.forEach((line) => {
    line.forEach((number) => {
      if (number != "X") {
        sum = sum + parseInt(number);
      }
    });
  });
  return winningNumber * sum;
}

function test() {
  const board1 = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  const board2 = [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6],
  ];

  const board3 = [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ];

  const parseExpected = {
    draw: [
      7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
      18, 20, 8, 19, 3, 26, 1,
    ],
    boards: [board1, board2, board3],
  };

  const parseResult = parseFile("/test.txt");

  console.assert(
    parseResult.draw[4] == parseExpected.draw[4],
    "Test failed; expected draw item in position 4 was not correct"
  );
  console.assert(
    parseResult.boards.length == parseExpected.boards.length,
    "Test failed; expected number of boards was incorrect"
  );
  console.assert(
    parseResult.boards[2][3][4] == parseExpected.boards[2][3][4],
    "Test failed; board item [2][3][4] did not match"
  );

  const markedBoard = markBoard(14, board1);
  console.assert(
    markedBoard[2][2] == "X",
    "board1 was expected to be marked with X at position 2, 2 but was not"
  );

  const winner1 = [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    ["X", "X", "X", "X", "X"],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ];

  const winner2 = [
    [14, 21, "X", 24, 4],
    [10, 16, "X", 9, 19],
    [18, 8, "X", 26, 20],
    [22, 11, "X", 6, 5],
    [2, 0, "X", 3, 7],
  ];

  console.assert(
    !checkForWinner(board1),
    "test failed, expected board board1 to return false"
  );
  console.assert(
    checkForWinner(winner1),
    "test failed, expected board winner1 to return true"
  );
  console.assert(
    checkForWinner(winner2),
    "test failed, expected board winner2 to return true"
  );

  const [winningNumber, winningBoard] = findFirstWinner(parseResult);
  console.assert(
    winningNumber == 24,
    `Expected draw number of winning detail to be 24 but was ${winningNumber}`
  );

  const value = calculateWinner(winningNumber, winningBoard);
  console.assert(
    value == 4512,
    `Expected to have test overall number of 4512 but was ${value}`
  );

  const [lastNumber, lastBoard] = findLastBoard(parseResult);
  console.assert(
    lastNumber == 13,
    `Expected draw number of winning detail to be 13 but was ${lastNumber}`
  );
  console.log("Last won board was", lastBoard);
}

test();

function day4() {
  const input = parseFile("/input1.txt");

  const [winningNumber, winningBoard] = findFirstWinner(input);
  const value = calculateWinner(winningNumber, winningBoard);
  console.log("Day 4 part 1 answer is", value);

  const [lastWonNumber, lastWonBoard] = findLastBoard(input);
  const valueLast = calculateWinner(lastWonNumber, lastWonBoard);
  console.log("Day 4 part 2 answer is", valueLast);
}

module.exports = { day4 };
