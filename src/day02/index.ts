import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const games = rawInput.split("\n").map((line) => {
    const [, number, contents] = line.match(/Game (\d+): (.*)/)!
    const gameNumber = parseInt(number)
    const handfuls = contents.split("; ").map((types) =>
      types.split(", ").map((set) => {
        const [qty, color] = set.split(" ")
        return {
          qty: parseInt(qty),
          color: color as "red" | "green" | "blue",
        }
      }),
    )
    return {
      gameNumber,
      handfuls,
    }
  })
  return games
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((total, game) => {
    const { gameNumber, handfuls } = game
    for (const handful of handfuls) {
      if (
        handful.some(
          (set) =>
            set.qty >
            {
              red: 12,
              green: 13,
              blue: 14,
            }[set.color],
        )
      ) {
        return total
      }
    }
    return total + gameNumber
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((total, game) => {
    const { handfuls } = game
    const minimums = {
      red: 0,
      green: 0,
      blue: 0,
    }
    for (const handful of handfuls) {
      for (const set of handful) {
        minimums[set.color] = Math.max(minimums[set.color] ?? 0, set.qty)
      }
    }
    return total + minimums.red * minimums.blue * minimums.green
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
