#!/usr/bin/env node

const fs = require('fs');
const math = require('mathjs');

const x = [], y = [];

fs.readFileSync('input/day01.txt').
    toString().
    trim().
    split('\n').
    forEach(s => {
        [v1, v2] = s.split(/\s+/).map(s => parseInt(s));
        x.push(v1);
        y.push(v2);
    });

// PART 1
let diffs = x.toSorted().map((value, index) => Math.abs(y.toSorted()[index] - value));
console.log(math.sum(diffs));

// PART 2
let dict = {};
y.forEach(i => dict[i] = dict[i] + 1 || 1);

let similarities = x.map((value) => value * (dict[value] || 0));
console.log(math.sum(similarities));
