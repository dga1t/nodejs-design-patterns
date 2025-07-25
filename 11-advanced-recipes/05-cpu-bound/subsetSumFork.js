import { EventEmitter } from 'node:events'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ProcessPool } from './processPool.js'

// TODO - refactor __dirname workaround
const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'workers', 'subsetSumProcessWorker.js')
const workers = new ProcessPool(workerFile, 2)

export class SubsetSum extends EventEmitter {
  constructor (sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start () {
    const worker = await workers.acquire()
    worker.send({ sum: this.sum, set: this.set })

    const onMessage = msg => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      }

      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}