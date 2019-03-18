import * as React from 'react'
import { generateHash } from '../lib/utils'

const sendToHashed = () => {
  const hash = generateHash()
  window.location.hash = hash
}

export class Lobby extends React.Component<{}, { key: string }> {
  state = { key: '' }

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ key: e.target['value'] })
  }

  handleButton = () => {
    if (this.state.key.length === 0) return
    window.location.hash = `#${this.state.key}`
  }

  render() {
    return (
      <div className="w-100 h-100 bg-green-blue flex flex-column justify-around items-center f5">
        <div className="w-100 h-50 bb flex flex-column items-center justify-center">
          If you are here to be the camera,
          <div className="b pointer pt2" onClick={sendToHashed}>
            click here.
          </div>
        </div>
        <div className="w-100 h-50 bb flex flex-column items-center justify-center">
          <div>If you are here to be the controller,</div>
          <div>write here the key of the camera:</div>

          <input
            type="text"
            className="b pointer mv3 w-80"
            onChange={this.handleInput}
            value={this.state.key}
          />
          <div className="br1 ba b--black pointer pa2 f2" onClick={this.handleButton}>
            GO
          </div>
        </div>
      </div>
    )
  }
}
