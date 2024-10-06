function * fruitGenerator () {
  yield 'peach'
  yield 'watermelon'
  return 'summer'   // does not get printed because not yielded
}

const fruitGeneratorObj = fruitGenerator()
console.log(fruitGeneratorObj.next())
console.log(fruitGeneratorObj.next())
console.log(fruitGeneratorObj.next())

console.log('Using for...of:')

for (const fruit of fruitGenerator()) {
  console.log(fruit)
}