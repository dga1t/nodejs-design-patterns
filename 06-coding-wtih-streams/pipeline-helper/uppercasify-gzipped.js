import { createGzip, createGunzip } from 'zlib'
import { Transform, pipeline } from 'stream'
import { promisify } from 'util'

// This example shows how to create a complicate pipeline using stream.pipeline()

// Usage: echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip

const pipelinePromise = promisify(pipeline)

const uppercasify = new Transform({
  transform (chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  }
})

async function main () {
  try {
    await pipelinePromise(
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