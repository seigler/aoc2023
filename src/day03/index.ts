import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  input.forEach((line, row) => {
    let numString = ""
    line.split("").forEach((char, col) => {
      if (/\d/.test(char)) {
        numString += char
      }
      if (!/\d/.test(line[col + 1] ?? "")) {
        // time to test current string
        if (numString === "") {
          return
        }
        for (
          let r = Math.max(row - 1, 0);
          r <= Math.min(row + 1, input.length - 1);
          r++
        ) {
          for (
            let c = Math.max(col - numString.length, 0);
            c <= Math.min(col + 1, line.length - 1);
            c++
          ) {
            if (!/\d|\./.test(input[r].charAt(c))) {
              total += parseInt(numString)
              numString = ""
              return // done with this char
            }
          }
        }
        numString = ""
      }
    })
  })
  return total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  input.forEach((line, row) => {
    line.split("").forEach((char, col) => {
      if (char === "*") {
        // ask every found number if it touches a star
        // add to total the product of all the pairs
      }
    })
  })
  return
}

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
