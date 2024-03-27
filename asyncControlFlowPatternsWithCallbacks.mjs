import { readFile, appendFile } from "node:fs"


// chapter 4 exercises

/**
 * Sequential Iteration pattern with callbacks. Pseudo:
 *
 * iterate() {
 *   if (index === tasks.length) return
 *
 *   task = tasks[index];
 *
 *   task(() => iterate(index++));
 * }
 *
 * iterate(0);
 */

// 4.1

// test files
const DEST = './result.txt'
const FILE1 = './test1.txt'
const FILE2 = './test2.txt'
const FILE3 = './test3.txt'

function concatFiles(files, dest, cb) {

  function iterate(idx) {
    if (idx === files.length) {
      return cb()
    }

    readAndAppend(files[idx], dest, (err) => {
      if (err) {
        return cb(err)
      }
      iterate(idx + 1)
    })
  }
  iterate(0)
}

function readAndAppend(filePath, dest, cb) {
  readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error, reading file: ', err)
      return cb(err)
    }

    appendFile(dest, data, (err) => {
      if (err) {
        console.error('Error, appending to file: ', err)
        return cb(err)
      }
      cb(null)
    })
  })
}

concatFiles([FILE1, FILE2, FILE3], DEST, (err) => {
  if (err) {
    return console.error(err)
  }
  return console.log('Done appending to: ', DEST)
})