import * as React from 'react'
import { Drone } from '../lib/lib'

export class App extends React.Component {
  video: React.RefObject<HTMLVideoElement> = React.createRef()
  drone: Drone

  async componentDidMount() {
    this.drone = new Drone(this.video.current)
  }

  takePicture = () => {
    this.drone.takePicture()
  }

  render() {
    return (
      <div className="w-100 h-100">
        <video ref={this.video} autoPlay={true} muted={true} />
        <div className="w-100 flex justify-center items-center pt4">
          <div className="pa2 b--black ba pointer br2" onClick={this.takePicture}>
            Send
          </div>
        </div>
      </div>
    )
  }
}
