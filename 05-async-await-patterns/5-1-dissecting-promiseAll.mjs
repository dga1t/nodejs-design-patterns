// Implement your own version of Promise.all() leveraging promises, async/await or a combination of the two.

const sleep = (ms = 1000) => new Promise(r => setTimeout(r, ms))

async function promiseAll(promises) {  
  const results = []
  try {
    for (const promise of promises) {
      results.push(await promise)
    }
  } catch(err) {
    console.log('Eggor while iterating over promises array: ', err)
  }
  return results
}

async function promiseAll2(promises) {
  return new Promise((resolve, reject) => {
    let results = []
    let resolvedCounter = 0
    promises.forEach((promise) => {
      promise.then((result) => {
        results.push(result)
        resolvedCounter++
        if (resolvedCounter === promises.length) resolve(results)
      }, reject)
    })
  })
}

function promiseAll3(promises) {
  return new Promise(async (resolve, reject) => {
    const result = []
    let length = 0
    let completed = 0
    for (const p of promises) {
      length++
      process.nextTick(async () => {
        try {
          result.push(await p)
          completed++
          if (completed === length) {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      })
    }
  })
}

console.log("------- promiseAll() -------")
console.log(await promiseAll([
  1,
  "a",
  Promise.resolve(3),
  new Promise(r => setTimeout(() => r(4), 1000)),
  new Promise(r => setTimeout(() => r(5), 1000)),
  new Promise((res, rej)  => setTimeout(() => rej(6), 1000)),
][Symbol.iterator]()
).catch((error) => (console.error(error), null)))

// console.time('resolved in')
// const resolvedPromises = await promiseAll3([
//   new Promise(async (resolve) => {
//     await sleep(2000)
//     resolve('First promise resolved')
//   }),
//   new Promise(async (resolve) => {
//     await sleep(1000)
//     resolve('Second promise resolved')
//   }),
//   new Promise(async (resolve) => {
//     await sleep(500)
//     resolve('Third promise resolved')
//   }),
//   new Promise(async (resolve, reject) => {
//     await sleep(1000)
//     reject('Fourth promise rejected')
//   })
// ])
// console.timeEnd('resolved in')

// resolvedPromises.map(resolvedPromise => console.log(resolvedPromise))
