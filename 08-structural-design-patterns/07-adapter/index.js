import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import level from 'level'

import { createFSAdapter } from './fs-adapter.js'

// This examples shows how to use the adapter pattern to build an FS-like interface that writes to level db instead

const __dirname = dirname(fileURLToPath(import.meta.url))
const db = level(join(__dirname, 'db'), { valueEncoding: 'binary' })
const fs = createFSAdapter(db)

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    if (err) {
      return console.error(err)
    }
    console.log(res)
  })
})

// try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(err)
})