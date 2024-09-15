import { OfflineState } from './offlineState.js'
import { OnlineState } from './onlineState.js'

// This sample demonstrates how to use the State pattern to create a client socket
// that doesn't break when it loses connection with the server.

export class FailsafeSocket {
  constructor (options) {
    this.options = options
    this.queue = []
    this.currentState = null
    this.socket = null
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    }
    this.changeState('offline')
  }

  changeState (state) {
    console.log(`Activating state: ${state}`)
    this.currentState = this.states[state]
    this.currentState.activate()
  }

  send (data) {
    this.currentState.send(data)
  }
}