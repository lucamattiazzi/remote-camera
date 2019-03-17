import * as React from 'react'
import { Drone } from '../lib/Drone'
import { Loading } from './Loading'
import { CameraInfo } from './CameraInfo'
import { ControllerInfo } from './ControllerInfo'

type State = {
  info: boolean
  isCamera: boolean
  loading: boolean
}

export class App extends React.Component<{}, State> {
  state: State = { info: true, isCamera: true, loading: true }
  video: React.RefObject<HTMLVideoElement> = React.createRef()
  drone: Drone

  async componentDidMount() {
    this.drone = new Drone(this.video.current, this.setController, this.setLoaded)
  }

  takePicture = () => this.drone.takePicture()
  setController = () => this.setState({ isCamera: false })
  setLoaded = () => this.setState({ loading: false })
  toggleInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    this.setState({ info: !this.state.info })
  }

  renderButton = () => (
    <div className="w-100 flex justify-around items-center h-10">
      <div className="pa2 b--black ba pointer br2 f3" onClick={this.drone.takePicture}>
        Take Pic
      </div>
    </div>
  )

  render() {
    const InfoComponent = this.state.isCamera ? CameraInfo : ControllerInfo
    const topLeftEmoji = this.state.isCamera ? '📷' : '✋'
    const topLeftText = this.state.isCamera ? 'Camera' : 'Controller'
    return (
      <div className="w-100 h-100 overflow-y-hidden">
        <video
          ref={this.video}
          autoPlay={true}
          muted={true}
          className="h-100 pointer"
          onClick={this.takePicture}
        />
        <div
          className="absolute top-1 right-1 pointer white flex flex-column items-center justify-center"
          onClick={this.toggleInfo}
        >
          <div className="f1">ℹ️</div>
          <div>Info</div>
        </div>
        <div
          className="absolute top-1 left-1 pointer white flex flex-column items-center justify-center"
          onClick={this.toggleInfo}
        >
          <div className="f1">{topLeftEmoji}</div>
          <div>{topLeftText}</div>
        </div>
        {this.state.info && <InfoComponent toggleInfo={this.toggleInfo} />}
        {this.state.loading && <Loading />}
      </div>
    )
  }
}
