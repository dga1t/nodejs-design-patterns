import { concatFiles } from './concat-files.js'

// Pattern: 
// Use a stream or a combination of streams to easily iterate over
// a set of asynchronous tasks in sequence

// Usage: node concat.js <destination> <source1> <source2> <source3> ...

async function main () {
  try {
    await concatFiles(process.argv[2], process.argv.slice(3))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('All files concatenated successfully')
}

main()