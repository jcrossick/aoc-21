const { readFile } = require("../util/readfile");

const parseFile = (filename) =>
  readFile(__dirname + filename)
    .split(",")
    .map((number) => parseInt(number))
    .sort((e1, e2) => e1 - e2);

const calcFuel = (crabPositions, target) => {
    let cost = 0;
    crabPositions.forEach(crabPosition => cost = cost + Math.abs(crabPosition - target));
    return cost;
}

const findMinFuel = (crabPositions) => {
    let fuel = undefined;
    let position = 0;
    for (let i = crabPositions[0]; i <= crabPositions[crabPositions.length -1]; i++) {
        const cost = calcFuel(crabPositions, i);
        //console.log("Position and fuel is", i, cost);
        if (!fuel || fuel > cost) {
            fuel = cost;
            position = i + 0;
        }
    }
    return position;
}

const test = () => {
    const crabPositions = parseFile("/test.txt");

    const testCost1 = calcFuel(crabPositions, 1);
    const testCost2 = calcFuel(crabPositions, 2);
    const testCost3 = calcFuel(crabPositions, 3);
    const testCost10 = calcFuel(crabPositions, 10);
    console.assert(testCost1 == 41, `Expected test cost to be 41 but was ${testCost1}`);
    console.assert(testCost2 == 37, `Expected test cost to be 37 but was ${testCost2}`);
    console.assert(testCost3 == 39, `Expected test cost to be 39 but was ${testCost3}`);
    console.assert(testCost10 == 71, `Expected test cost to be 71 but was ${testCost10}`);

    const position = findMinFuel(crabPositions);
    console.assert(position == 2, `Position is ${position} but expected it to be 2`)
}

test();

function day7() {
    const crabPositions = parseFile("/part1.txt");
    const position = findMinFuel(crabPositions);
    console.log(`Position with the lowest cost is`, position)
    const fuel = calcFuel(crabPositions, position);
    console.log("Fuel spent is", fuel)

}

module.exports = { day7 };
