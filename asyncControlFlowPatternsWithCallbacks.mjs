import { readFile, appendFile } from "node:fs"


// chapter 4 exercises


const DEST_FILE = './result.txt'
const FILE1 = './test1.txt'
const FILE2 = './test2.txt'
const FILE3 = './test3.txt'

// 4.1
function concatFiles(dest, cb, ...srcFiles) {
  console.log('srcFiles === ', srcFiles)

  function iterate(idx) {
    if (idx === srcFiles.length) {
      return cb()
    }

    readFromSrcAndWriteToDest(srcFiles[idx], function (err) {
      if (err) {
        return cb(err)
      }
      iterate(idx + 1)
    })
  }

  function readFromSrcAndWriteToDest(filePath, cb) {
    readFile(filePath, function (err, fileContent) {
      console.log(`file ${filePath} content: ${fileContent}`)

      if (err) {
        return cb(err)
      }

      appendFile(DEST_FILE, fileContent, function (err) {
        if (err) {
          return cb(err)
        }
        console.log(`done appending from file: ${filePath}`)
      })
    })
    cb()
  }

  iterate(0)
}

function finish(err) {
  if (err) {
    console.log(' error while concatinating: ', err)
  }
  console.log('*** done iterating ***')
}

concatFiles(DEST_FILE, finish, FILE1, FILE2, FILE3)