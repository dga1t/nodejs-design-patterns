import { Matrix } from './matrix.js'

// This sample demonstrates how to implement the Iterable protocol.

const matrix2x2 = new Matrix([
  ['11', '12'],
  ['21', '22']
])

const iterator = matrix2x2[Symbol.iterator]()
let iterationResult = iterator.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}