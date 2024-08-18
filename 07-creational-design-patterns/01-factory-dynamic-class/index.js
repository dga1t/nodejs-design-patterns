import { ImageGif, ImageJpeg, ImagePng } from './image.js'

// This sample demonstrates how to create a Factory function that can resolve the class of the object to create at runtime.

function createImage (name) {
  if (name.match(/\.jpe?g$/)) {
    return new ImageJpeg(name)
  } else if (name.match(/\.gif$/)) {
    return new ImageGif(name)
  } else if (name.match(/\.png$/)) {
    return new ImagePng(name)
  } else {
    throw new Error('Unsupported format')
  }
}

const image1 = createImage('photo.jpg')
const image2 = createImage('photo.gif')
const image3 = createImage('photo.png')

console.log(image1, image2, image3)