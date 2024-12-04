#!/usr/bin/env node

const fs = require('fs');

let mem = fs.
    readFileSync('input/day03.txt').
    toString().
    trim().
    split('\n').
    join("");

function compute(x) {
    return x.split(",").map(s => parseInt(s)).reduce((a, b) => a * b, 1);
}

// PART 1
let r = /mul\((\d+,\d+)\)/g;
let instructions = [...mem.matchAll(r)];

let part1 = instructions.
    map(x => compute(x[1])).
    reduce((a, b) => a + b, 0);

console.log(part1);

// PART 2
r = /don't|do|mul\((\d+,\d+)\)/g;
instructions = [...mem.matchAll(r)];

part2 = 0;
on = true;
instructions.
    forEach(x => {
        switch(x[0]) {
            case "do":
                on = true
                break
            case "don't":
                on = false
                break
            default:
                part2 += on ? compute(x[1]) : 0
        }
    });

console.log(part2);
