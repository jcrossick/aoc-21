const { readFile } = require("../util/readfile");

const parseFile = (filename) =>
  readFile(__dirname + filename)
    .split(",")
    .map((number) => parseInt(number))
    .sort((e1, e2) => e1 - e2);

const calcFuel = (crabPositions, target) => {
  let cost = 0;
  crabPositions.forEach(
    (crabPosition) => (cost = cost + Math.abs(crabPosition - target))
  );
  return cost;
};

function calcFuelPt2(crabPositions, target) {
  let cost = 0;
  crabPositions.forEach(
    (crabPosition) => (cost = cost + moveCost(Math.abs(crabPosition - target)))
  );
  return cost;
};

//sum(1+2+3+4...n) = n*(n+1)/2
const moveCost = (number) => (number * (number + 1)) / 2;

const findMinFuel = (crabPositions, fuelCalc) => {
  let fuel = undefined;
  let position = 0;
  for (
    let i = crabPositions[0];
    i <= crabPositions[crabPositions.length - 1];
    i++
  ) {
    const cost = fuelCalc(crabPositions, i);
    //console.log("Position and fuel is", i, cost);
    if (!fuel || fuel > cost) {
      fuel = cost;
      position = i + 0;
    }
  }
  return position;
};

const test = () => {
  const crabPositions = parseFile("/test.txt");

  const testCost1 = calcFuel(crabPositions, 1);
  const testCost2 = calcFuel(crabPositions, 2);
  const testCost3 = calcFuel(crabPositions, 3);
  const testCost10 = calcFuel(crabPositions, 10);
  console.assert(
    testCost1 == 41,
    `Expected test cost to be 41 but was ${testCost1}`
  );
  console.assert(
    testCost2 == 37,
    `Expected test cost to be 37 but was ${testCost2}`
  );
  console.assert(
    testCost3 == 39,
    `Expected test cost to be 39 but was ${testCost3}`
  );
  console.assert(
    testCost10 == 71,
    `Expected test cost to be 71 but was ${testCost10}`
  );

  const position = findMinFuel(crabPositions, calcFuel);
  console.assert(
    position == 2,
    `Position is ${position} but expected it to be 2`
  );

  console.assert(moveCost(16 - 5) == 66, "Failed Move from 16 to 5: 66 fuel");
  console.assert(moveCost(5 - 1) == 10, "Failed Move from 1 to 5: 10 fuel");
  console.assert(moveCost(5 - 2) == 6, "Failed Move from 2 to 5: 6 fuel");
  console.assert(moveCost(5 - 0) == 15, "Failed Move from 0 to 5: 15 fuel");
  console.assert(moveCost(5 - 4) == 1, "Failed Move from 4 to 5: 1 fuel");
  console.assert(moveCost(7 - 5) == 3, "Failed Move from 7 to 5: 3 fuel");
  console.assert(moveCost(14 - 5) == 45, "Failed Move from 14 to 5: 45 fuel");
};

test();

function day7() {
  const crabPositions = parseFile("/part1.txt");
  let fuelCalc = calcFuel;
  const position = findMinFuel(crabPositions, calcFuel);
  console.log(`Position with the lowest cost part1 is`, position);
  const fuel = fuelCalc(crabPositions, position);
  console.log("Fuel spent part1 is", fuel);

  fuelCalc = calcFuelPt2;
  const position2 = findMinFuel(crabPositions, calcFuelPt2);
  console.log(`Position with the lowest cost part2 is`, position2);
  const fuel2 = fuelCalc(crabPositions, position2);
  console.log("Fuel spent part2 is", fuel2);
}

module.exports = { day7 };
