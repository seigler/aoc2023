import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const [seeds, ...maps] = rawInput.split("\n\n")
  return {
    seeds: seeds.split(": ")[1].split(" ").map(Number),
    maps: maps.map((map) =>
      map
        .split("map:\n")[1]
        .split("\n")
        .map((line) => line.split(" ").map(Number)),
    ),
  }
}

const part1 = (rawInput: string) => {
  const { seeds, maps } = parseInput(rawInput)
  let locations = seeds.map((seed) =>
    maps.reduce((id, map) => {
      for (const [to, from, span] of map) {
        if (id >= from && id < from + span) {
          return id - from + to
        }
      }
      return id
    }, seed),
  )
  return locations.sort((a, b) => a - b)[0]
}

/** [start, end) */
type Range = [number, number]

const getMapper = ([mapDestStart, mapSourceStart, mapLength]: number[]) => {
  return (range: Range) => {
    const [a, b] = range
    const c = mapSourceStart
    const d = mapSourceStart + mapLength
    /*
    a        b
    ==========
         ==============
         c            d
    */
    const affected: Range = [
      Math.max(a, c) - mapSourceStart + mapDestStart,
      Math.min(b, d) - mapSourceStart + mapDestStart,
    ]
    if (affected[1] - affected[0] <= 0) {
      return { affected: [], unaffected: [range] }
    }
    const unaffected: Range[] = []
    if (a < c) {
      unaffected.push([a, c])
    }
    if (b > d) {
      unaffected.push([d, b])
    }
    return {
      affected: [affected],
      unaffected,
    }
  }
}

const part2 = (rawInput: string) => {
  const { seeds, maps } = parseInput(rawInput)
  let seedRanges: Range[] = []
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]])
  }
  let queue: Range[] = seedRanges
  for (const map of maps) {
    const mappers = map.map(getMapper)
    const affected: Range[] = []
    for (const mapper of mappers) {
      const unaffected: Range[] = []
      while (queue.length > 0) {
        const x = mapper(queue.shift()!)
        unaffected.push(...x.unaffected)
        affected.push(...x.affected)
      }
      queue.push(...unaffected)
    }
    queue.push(...affected)
  }
  return queue.sort((a, b) => a[0] - b[0])[0][0]
}

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
