#!/usr/bin/env node

const fs = require('fs');

const x = [];
const y = [];

pairs = fs.
    readFileSync('input/day1.txt').
    toString().
    trim().
    split('\n');

pairs.forEach((s) => {
    [v1, v2] = s.
        split(/\s+/).
        map(s => parseInt(s));
    x.push(v1);
    y.push(v2);
});

// PART 1
diffs = x.toSorted().map((value, index) => Math.abs(y.toSorted()[index] - value));
part1 = diffs.reduce((a, b) => a + b, 0);
console.log(part1);

// PART 2
dict = new Map();
y.forEach((i) => {
    dict.set(i, (dict.get(i) === undefined) ? 1 : dict.get(i) + 1);
})

similarities = x.map((value) => value * ((dict.get(value) === undefined) ? 0 : dict.get(value)));
part2 = similarities.reduce((a, b) => a + b, 0);
console.log(part2)
