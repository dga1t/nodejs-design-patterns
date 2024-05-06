/*
  Implement your own version of Promise.all() leveraging promises, async/await or a combination of the two.
*/

async function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let completed = 0
    const result = []
    for (const p of promises) {
      process.nextTick(async () => {
        try {
          result.push(await p)
          completed++
          if (completed === promises.length) {
            resolve(result)
          }
        } catch(err) {
          console.log('Eggor while iterating over promises array: ', err)
          reject (err)
        }
      })
    }
  })
}

console.time('promiseAll done in')
console.log(await promiseAll([
  1,
  '2',
  Promise.resolve(3),
  new Promise(r => setTimeout(() => r(4), 2000)),
  new Promise(r => setTimeout(() => r(5), 1000)),
  new Promise((res, rej)  => setTimeout(() => rej(6), 500)),
]
).catch((error) => (console.error(error), null)))
console.timeEnd('promiseAll done in')
