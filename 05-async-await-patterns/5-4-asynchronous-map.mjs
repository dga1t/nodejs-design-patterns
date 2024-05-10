
const sleep = (ms = 1000) => new Promise(r => setTimeout(r, ms))

function mapAsync(items, cb, concurrency) {
  const itemsMap = new Map(items.map((item, index) => [index, item]))
  const itemsIterable = itemsMap.entries()
  const resultsMap = new Map()

  return new Promise((resolve, reject) => {
    for (let i = 0; i < concurrency; i++) {
      runner()
    }

    async function runner() {
      while (true) {
        try {
          const { value: item, done } = itemsIterable.next()

          if (done) break

          const [key, value] = item
          const result = await cb(value)
          resultsMap.set(key, result)

          if (resultsMap.size === itemsMap.size) {
            resolve([...resultsMap.values()])
            break
          }
            
        } catch (err) {
          reject(err)
          break
        }
      }
    }
  })
}

const results = await mapAsync(['a', 'b', 'c', 'd', 'e', 'f'], async (item) => {
  await sleep()
  console.log(`${item} item Done.`)
  return item
}, 3)

console.log(results)
