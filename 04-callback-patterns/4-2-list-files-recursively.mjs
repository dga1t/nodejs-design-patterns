import { readdir } from "node:fs"

const TESTDIR = '/home/dp/Pictures'

let activeDir = 0
let filesDiscovered = []

function listNestedFiles(dir, cb) {
  readDir(dir, (err, files) => {
    if (err) {
      return cb(err)
    }
    return cb(null, files)
  })  
}

function readDir(dir, cb) {
  activeDir++

  return readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      cb(err)
    }
    
    for (let file of files) {

      if (file.isDirectory()) {
        console.log('*** Found a directory: ', path)        
        readDir(path.join(dir, file.name), cb)

      } else {
        console.log('*** Found a file: ', path)        
        filesDiscovered.push(file)
      }
    }

    activeDir--

    if (activeDir <= 0) {
      return cb(null, filesDiscovered)
    }
  })
}

listNestedFiles(TESTDIR, (err, files) => {
  if (err) {
    console.log('Something went wrong: ', err)
  }
  console.log('Files discovered: ', files)
})
