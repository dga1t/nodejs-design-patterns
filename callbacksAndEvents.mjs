import { EventEmitter } from 'node:events'
import { nextTick } from 'node:process'
import { readFile } from 'node:fs'

// chapter 3 exercises

// 3.1
class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    nextTick(() => this.emit('find', this.files))

    for (const file of this.files) {
      readFile(file, 'utf-8', (err, content) => {
        if (err) {
          return this.emit('error', err)
        }

        this.emit('fileread', file)

        const match = content.match(this.regex)
        if (match) {
          match.forEach(el => this.emit('found', file, el))
        }
      })
    }
    return this
  }
}

// 3.2 && 3.3 && 3.4 mixed together
function ticker(timeLimit, cb) {
  const INTERVAL = 50
  const ERR = new Error('OMG tick timestamp is divisible by 5')

  let tickCounter = 0

  const start = Date.now()
  const eventEmitter = new EventEmitter()

  function emitTick() {
    eventEmitter.emit('tick', Date.now() - start)
    tickCounter++

    if (Date.now() % 5 === 0) {
      eventEmitter.emit('error', ERR)
      return cb(ERR, tickCounter)
    }
  }

  nextTick(() => emitTick())

  function repeat() {
    emitTick()

    if (Date.now() - start >= timeLimit) {
      return cb(null, tickCounter)
    }

    setTimeout(repeat, INTERVAL)
  }

  setTimeout(repeat, INTERVAL)
  
  return eventEmitter
}

// example usage: node callbacksAndEvents.mjs 200
(() => {
  const ms = parseInt(process.argv[2])

  if (isNaN(ms)) {
    console.log('please provide a number of milliseconds as an argument')
    return
  }

  const tick = ticker(ms, (error, counter) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('number of tick events fired: ', counter)
  })

  tick
    .on('tick', (ms) => console.log('tick after ms: ', ms))
    .on('error', (error) => console.log(error))
})()