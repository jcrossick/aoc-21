const { readFile } = require("../util/readfile");

const parseFile = filename => readFile(__dirname + filename).split(",").map(number => parseInt(number));

const addDay = allFish => {
    const newFish = [];
    const todaysFish = allFish.map(fish => {
        if (fish == 0) {
            newFish.push(8);
        }
        return fish == 0 ? 6 : fish - 1
    })
    return todaysFish.concat(newFish);
}

function test() {
    const input = parseFile("/test.txt");
    console.assert(JSON.stringify(input) == "[3,4,3,1,2]", "Did not parse input correctly");

    const day18 = '[6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8]';
    let todaysFish = input;
    for (let i=0; i<18; i++) {
        todaysFish = addDay(todaysFish);
    }
    console.assert(JSON.stringify(todaysFish) == day18, "Day 18 was not correct");

}

test();

function day6() {
    let todaysFish = parseFile("/part1.txt");
    const noOfDays = 80;
    for (let i=0; i<noOfDays; i++) {
        todaysFish = addDay(todaysFish);
    }
    console.log("Number of fish is", todaysFish.length);

}

module.exports = { day6 };
