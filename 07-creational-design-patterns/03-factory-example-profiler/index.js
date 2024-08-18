import { createProfiler } from './profiler.js'

// This example shows how to use the factory pattern that creates different objects
// depending on the value of the NODE_ENV environment variable.

// Useage:
// Launch in development mode (with profiler)
// node index.js 2201307499
// 
// Launch in production mode (without profiler)
// NODE_ENV=production node index.js 2201307499 

function getAllFactors (intNumber) {
  const profiler = createProfiler(
    `Finding all factors of ${intNumber}`)

  profiler.start()
  const factors = []
  for (let factor = 2; factor <= intNumber; factor++) {
    while ((intNumber % factor) === 0) {
      factors.push(factor)
      intNumber = intNumber / factor
      console.log('int number - ', intNumber)
    }
  }
  profiler.end()

  return factors
}

const myNumber = process.argv[2]
const myFactors = getAllFactors(myNumber)
console.log(`Factors of ${myNumber} are: `, myFactors)