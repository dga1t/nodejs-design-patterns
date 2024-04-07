import { readdir } from "node:fs"

const TESTDIR = '/home/dp/projects/nodejs-design-patterns/04-callback-patterns/dir'
const KEYWORD = 'bar'

let matchingFiles = []

function recursiveFind(dir, keyword, cb) {
  searchDir(dir, keyword, (err, files) => {
    if (err) {
      return cb(err)
    }
    return cb(null, files)
  })
}

function searchDir(dir, keyword, cb) {
  return readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      cb(err)
    }
    
    for (let file of files) {
      const accessPath = path.join(dir, file.name)
      
      if (file.isDirectory()) {
        searchDir(accessPath, keyword, cb)
      } else {
        searchFile(accessPath, keyword, cb)
      }
    }
    return cb(null, matchingFiles)
  })
}

function searchFile(file, keyword, cb) {
  readFile(file, (err, data) => {
    if (err) {
      cb(err)
    }
    if (data.toString('utf8').includes(keyword)) {
      matchingFiles.push(file)
    }
  })
}

recursiveFind(TESTDIR, KEYWORD, (err, found) => {
  if (err) {
    console.log('Something went wrong: ', err)
  }
  console.log('Files that contain the keyword: ', found)        
})