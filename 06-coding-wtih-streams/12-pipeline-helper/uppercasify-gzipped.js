import { createGzip, createGunzip } from 'node:zlib'
import { Transform } from 'stream'
import { pipeline } from 'node:stream/promises'

// This example shows how to create a complicate pipeline using stream.pipeline()

// Usage: echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip

const uppercasify = new Transform({
  transform (chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  }
})

async function main () {
  try {
    await pipeline(
      process.stdin,
      createGunzip(),
      uppercasify,
      createGzip(),
      process.stdout
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()