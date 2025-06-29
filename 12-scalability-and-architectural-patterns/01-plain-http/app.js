import { createServer } from 'node:http'

const { pid } = process
const server = createServer((req, res) => {
  let i = 1e7; while (i > 0) { i-- }  // simulates CPU intensive work
  console.log(`Handling request from ${pid}`)
  res.end(`Hello from ${pid}\n`)
})

server.listen(8080, () => console.log(`Started at ${pid}`))