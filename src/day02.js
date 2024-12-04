#!/usr/bin/env node

const fs = require('fs');

const pos = new Set([1, 2, 3])
const neg = new Set([-1, -2, -3])

let reports = fs.
    readFileSync('input/day02.txt').
    toString().
    trim().
    split('\n').
    map((s) => s.split(/\s+/).map(s => parseInt(s)))

// PART 1
let part1 = 0
reports.forEach(report => {
    let diffs = report.map((x, i) => (i > 0) ? x - report[i-1] : 0)
    let s = new Set(diffs.slice(1))
    part1 += s.isSubsetOf(neg) || s.isSubsetOf(pos)
})

console.log(part1)

// PART 2
let part2 = 0

reports.forEach((report) => {
    let diffs = report.map((x, i) => (i > 0) ? x - report[i-1] : 0)
    let s = new Set(diffs.slice(1))
    var safe = s.isSubsetOf(neg) || s.isSubsetOf(pos)
    if (safe) {
        part2++
    } else {
        report.map((x, i) => {
            let spliced = report.slice()
            spliced.splice(i, 1)
            let diffs = spliced.map((x, i) => (i > 0) ? x - spliced[i-1] : 0)
            let s = new Set(diffs.slice(1))
            safe = safe || s.isSubsetOf(neg) || s.isSubsetOf(pos)
        })
        part2 += safe
    }
})

console.log(part2)
