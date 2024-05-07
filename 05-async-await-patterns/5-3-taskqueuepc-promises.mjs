/*
  5.3 Producer-consumer with promises: Update the TaskQueuePC class
  internal methods so that they use just promises, removing any use of the
  async/await syntax. Hint: the infinite loop must become an asynchronous
  recursion. Beware of the recursive Promise resolution memory leak!
*/

// TODO - test if TaskQueuePC works correctly, especially pool of consumers !!1

export class TaskQueuePC {
  constructor (concurrency) {
    this.taskQueue = []
    this.consumerQueue = []

    // spawn consumers
    for (let i = 0; i < concurrency; i++) {
      this.consumer()
    }
  }

  consumer () {
    return new Promise(resolve => {
      this.getNextTask()
      .then(task => task())
      .catch(err => console.error(err))
      .finally(() => {
        // resolve(this.consumer()) - will cause a memory leak bug in the infinitely recursive promise resolution chain.
        this.consumer()
        resolve()
      });
    });
  }

  getNextTask () {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift())
      }
      this.consumerQueue.push(resolve)
    })
  }

  runTask (task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task()
        taskPromise.then(resolve, reject)
        return taskPromise
      }

      if (this.consumerQueue.length !== 0) {
        // there is a sleeping consumer available, use it to run our task
        const consumer = this.consumerQueue.shift()
        consumer(taskWrapper)
      } else {
        // all consumers are busy, enqueue the task
        this.taskQueue.push(taskWrapper)
      }
    })
  }
}