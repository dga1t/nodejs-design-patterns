class Image {
  constructor (path) {
    this.path = path
  }
}

export class ImageGif extends Image {
  constructor (path) {
    if (!path.match(/\.gif/)) {
      throw new Error(`${path} is not a GIF image`)
    }
    super(path)
  }
}

export class ImageJpeg extends Image {
  constructor (path) {
    if (!path.match(/\.jpe?g$/)) {
      throw new Error(`${path} is not a JPEG image`)
    }
    super(path)
  }
}

export class ImagePng extends Image {
  constructor (path) {
    if (!path.match(/\.png$/)) {
      throw new Error(`${path} is not a PNG image`)
    }
    super(path)
  }
}