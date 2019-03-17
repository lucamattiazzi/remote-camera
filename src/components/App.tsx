import * as React from 'react'
import { Drone } from '../lib/lib'

type State = {
  countdown: number
  isCamera: boolean
}

export class App extends React.Component<{}, State> {
  video: React.RefObject<HTMLVideoElement> = React.createRef()
  drone: Drone
  state: State = { countdown: 0, isCamera: true }

  async componentDidMount() {
    this.drone = new Drone(this.video.current, this.setController)
  }

  setController = () => this.setState({ isCamera: false })

  renderButton = () => (
    <div className="w-100 flex justify-around items-center h-10">
      <div className="pa2 b--black ba pointer br2 f3" onClick={this.drone.takePicture}>
        Take Pic
      </div>
    </div>
  )

  copyToClipboard = () => {
    const el = document.createElement('textarea')
    el.value = window.location.href
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  renderHeader = () => (
    <div className="w-100 flex flex-column justify-around items-center h-10">
      <div className="f5">Send to: (click to copy)</div>
      <div className="pointer f4 b" onClick={this.copyToClipboard}>
        {window.location.href}
      </div>
    </div>
  )

  render() {
    return (
      <div className="w-100 h-100 overflow-y-hidden">
        {this.state.isCamera && this.renderHeader()}
        <video ref={this.video} autoPlay={true} muted={true} className="h-90" />
        {!this.state.isCamera && this.renderButton()}
      </div>
    )
  }
}
