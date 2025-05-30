import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [, b] = line.split(/:\s+/)
    return b.split(" | ").map((x) => x.split(/\s+/).map(Number)) as [
      number[],
      number[],
    ]
  })

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((total, [winning, have]) => {
    const numMatches = have.filter((x) => winning.includes(x)).length
    if (numMatches === 0) {
      return total
    }
    return total + 2 ** (numMatches - 1)
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const counts = input.map((x) => 1)
  input.forEach(([winning, have], row) => {
    const numMatches = have.filter((x) => winning.includes(x)).length
    for (let i = 0; i < numMatches; i++) {
      counts[row + i + 1] += counts[row]
    }
  }, 0)
  return counts.reduce((total, x) => total + x)
}

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
