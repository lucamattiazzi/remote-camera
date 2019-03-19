import * as React from 'react'
import { Drone } from '../lib/Drone'
import { Loading } from './Loading'
import { CameraInfo } from './CameraInfo'
import { ControllerInfo } from './ControllerInfo'
import { Message } from './Message'
import { Button } from './Button'
import { Countdown } from './Countdown'
import { Flash } from './Flash'
import { delayed } from '../lib/utils'

type State = {
  info: boolean
  isController: boolean
  loading: boolean
  showMessage: boolean
  messageText: string
  countdown: number
  flash: boolean
}

export class Camera extends React.Component<{}, State> {
  state: State = {
    info: true,
    isController: false,
    loading: true,
    showMessage: false,
    messageText: '',
    countdown: 0,
    flash: false,
  }
  video: React.RefObject<HTMLVideoElement> = React.createRef()
  drone: Drone

  async componentDidMount() {
    this.drone = new Drone()
    this.drone.on('isController', this.setController)
    this.drone.on('isLoaded', this.setLoaded)
    this.drone.on('setTrack', this.setTrack)
  }

  setController = () => this.setState({ isController: true })
  setLoaded = () => this.setState({ loading: false })
  setTrack = (stream: MediaStream) => (this.video.current.srcObject = stream)

  takePicture = () => {
    this.drone.takePicture()
    this.setState({ flash: true }, delayed(this.removeFlash, 900))
  }

  removeFlash = () => this.setState({ flash: false })

  runCountDown = () => {
    if (this.state.countdown === 0) return this.takePicture()
    this.setState({ countdown: this.state.countdown - 1 }, delayed(this.runCountDown, 1000))
  }

  setMessage = (messageText: string) => {
    this.setState(
      { messageText, showMessage: true },
      delayed(() => this.setState({ showMessage: false }), 2000)
    )
  }

  toggleInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    this.setState({ info: !this.state.info })
  }

  delayedPicture = () => {
    this.setState({ countdown: 5 }, delayed(this.runCountDown, 1000))
  }

  render() {
    const { isController, showMessage, loading, messageText, info, flash } = this.state
    const InfoComponent = isController ? ControllerInfo : CameraInfo
    const topLeftEmoji = isController ? '✋' : '📷'
    const messageClass = showMessage ? 'toasty-show' : 'toasty-hidden'
    return (
      <div className="w-100 h-100 overflow-hidden relative">
        {!loading && (
          <video
            ref={this.video}
            autoPlay={true}
            muted={true}
            className="w-100 h-100 pointer"
            onClick={this.takePicture}
          />
        )}
        <Button onClick={this.toggleInfo} className="top-1 right-1" symbol="ℹ️" />
        <Button className="top-1 left-1" symbol={topLeftEmoji} />
        {isController && (
          <Button onClick={this.delayedPicture} className="bottom-1 right-1" symbol="⏱️" />
        )}

        {!loading && info && (
          <InfoComponent toggleInfo={this.toggleInfo} toggleToast={this.setMessage} />
        )}
        <Message text={messageText} className={messageClass} />
        {this.state.countdown !== 0 && <Countdown value={this.state.countdown} />}
        {loading && <Loading />}
        {flash && <Flash />}
      </div>
    )
  }
}
