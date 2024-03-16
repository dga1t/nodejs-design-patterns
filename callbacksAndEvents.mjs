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

// 3.2 && 3.3 && 3.4
function ticker(timeLimit, cb) {
  let tickCounter = 0
  const INTERVAL = 50
  const start = Date.now()
  const eventEmitter = new EventEmitter()

  nextTick(() => emitTick())

  function emitTick() {
    const now = Date.now()
    eventEmitter.emit('tick')
    tickCounter++
    if (now % 5 === 0) eventEmitter.emit('error')
  }

  function repeat() {
    emitTick()
    const now = Date.now()
    const timeDiff = now - start

    console.log('tickCounter --- ', tickCounter)
    console.log('timeDiff --- ', timeDiff)

    if (timeDiff >= timeLimit) {
      return cb(tickCounter)
    }

    setTimeout(repeat, INTERVAL)
  }

  setTimeout(repeat, INTERVAL)
  
  return eventEmitter
}

ticker(200, (counter) => console.log('number of ticks --- ', counter))