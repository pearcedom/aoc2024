#!/usr/bin/env node

const fs = require('fs');

function range(start, stop) {
    return [...Array(stop - start).keys()].map(i => i - Math.abs(start))
}

let rows = fs.
    readFileSync('input/day04.txt').
    toString().
    trim().
    split('\n').
    map(s => s.split(""))

// PART 1
// Get columns
let dim = range(0, rows.length)
let cols = dim.map(col => dim.map(row => rows[row][col]));

// Get diagonals
let seq = range(-rows.length+4, rows.length-3)
let diags1 = seq.map(i => rows.map((a, j) => a[j + i]));
let diags2 = seq.map(i => rows.map((a, j) => a.toReversed()[j + i]));

// Combine
let vecs = [...rows, ...cols, ...diags1, ...diags2].
    filter(val => val !== undefined).
    map(v => v.join(""));

let part1 = 0;
vecs.forEach(vec => {
    part1 += [...vec.matchAll(/XMAS/g)].length;
    part1 += [...vec.matchAll(/SAMX/g)].length;
});

console.log(part1);

// PART 2
let part2 = 0;
let r = /SAM|MAS/
seq = [...Array(rows.length-2).keys()];

seq.forEach(row_i => {
    let rows3 = rows.slice(0+row_i, 3+row_i)
    seq.forEach(col_i => {
        let down = rows3.map((a, j) => a[j + col_i]).join("");
        let up = rows3.toReversed().map((a, j) => a[j + col_i]).join("");
        part2 += r.test(up) && r.test(down);
    })
});

console.log(part2);
