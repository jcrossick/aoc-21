const { readFile } = require("../util/readfile");

const parseFile = (filename) =>
  readFile(__dirname + filename)
    .split(",")
    .map((number) => parseInt(number));

const addDay = (allFish) => {
  const newFish = [];
  const todaysFish = allFish.map((fish) => {
    if (fish == 0) {
      newFish.push(8);
    }
    return fish == 0 ? 6 : fish - 1;
  });
  return todaysFish.concat(newFish);
};

const fishGrowth = (totalDays) => {
  let allFish = [0];
  for (let i = 0; i < totalDays - 7; i++) {
    allFish = addDay(allFish);
  }
  const fishByAge = [];
  for (let i = 0; i < 7; i++) {
    fishByAge.push([...allFish]);
    allFish = addDay(allFish);
  }
  return fishByAge;
};

const calcFish = (days, allFish) => {
  const fishByAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  allFish.forEach((fish) => fishByAge[fish]++);

  for (let i = 0; i < days; i++) {
    const fishDayZero = fishByAge.shift();
    fishByAge[6] = fishByAge[6] + fishDayZero;
    fishByAge.push(fishDayZero);
  }
  return fishByAge.reduce((acc, fish) => acc + fish);
};

function test() {
  const input = parseFile("/test.txt");
  console.assert(
    JSON.stringify(input) == "[3,4,3,1,2]",
    "Did not parse input correctly"
  );

  const day18 = [
    6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
    8,
  ];
  let todaysFish = input;
  const fishByAge = fishGrowth(18);
  let totalFish = [];
  todaysFish.forEach((fish) => {
    totalFish = totalFish.concat(fishByAge[7 - fish]);
  });

  console.assert(
    JSON.stringify(totalFish.sort()) == JSON.stringify(day18.sort()),
    "Day 18 was not correct"
  );
}

//test();

function part1() {
  let todaysFish = parseFile("/part1.txt");
  const noOfDays = 80;
  for (let i = 0; i < noOfDays; i++) {
    todaysFish = addDay(todaysFish);
  }
  console.log("Number of fish: part1 is", todaysFish.length);
}

function part2() {
  let todaysFish = parseFile("/part1.txt");
  const noOfDays = 256;

  const totalFish = calcFish(256, todaysFish);
  // const fishByAge = fishGrowth(noOfDays);
  // console.log("Fish growth is finished");
  // let totalFish = 0;
  // todaysFish.forEach((fish) => {
  //     totalFish = totalFish + fishByAge[7 - fish].length;
  // });

  console.log("Number of fish: part2 is", totalFish);
}

function day6() {
  //part1();
  part2();
}

module.exports = { day6 };
