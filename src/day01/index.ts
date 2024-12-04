import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((acc, line) => {
    const [left] = line.match(/\d/)!
    const [, right] = line.match(/.*(\d)/)!
    return acc + parseInt(left) * 10 + parseInt(right)
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((acc, line) => {
    const [left] = line.match(
      /\d|one|two|three|four|five|six|seven|eight|nine/,
    )!
    const [, right] = line.match(
      /.*(\d|one|two|three|four|five|six|seven|eight|nine)/,
    )!
    const lookup = new Map<string, number>()
    for (let i = 1; i < 10; i++) {
      lookup.set(String(i), i)
      lookup.set(
        [
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
        ][i - 1],
        i,
      )
    }
    return acc + lookup.get(left)! * 10 + lookup.get(right)!
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
