import { concatFiles } from './concat-files.js'

// This example shows how to create a sequential execution flow using streams.
// Usage: node concat.js <destination> <source1> <source2> <source3> ...

async function main () {
  const dest = process.argv[2]
  const files = process.argv.slict(3)
  
  try {
    await concatFiles(dest, files)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('All files concatenated successfully')
}
main()