import { saveAs } from 'file-saver'

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
}

const constraints = { video: { facingMode: 'environment', width: 640 } }

export class Drone {
  pc: webkitRTCPeerConnection
  track: MediaStreamTrack
  subscriptions: { [key: string]: Function[] }
  roomName: string
  drone: any
  room: any

  constructor() {
    this.roomName = `observable-${window.location.hash.substring(1)}`
    this.drone = new window['ScaleDrone']('tauc0xbyLWJcbinO')
    this.subscriptions = {}

    this.drone.on('open', this.handleOpen)
  }

  on = (event: string, callback: Function) => {
    this.subscriptions[event] = this.subscriptions[event] || []
    this.subscriptions[event].push(callback)
  }

  emit = (event: string, payload?: any) => {
    const subscribers = this.subscriptions[event]
    if (!subscribers || subscribers.length === 0) return
    for (const subscriber of subscribers) {
      subscriber(payload)
    }
  }

  handleOpen = () => {
    this.room = this.drone.subscribe(this.roomName)
    this.room.on('members', this.handleMembers)
  }

  handleMembers = (members: any[]) => {
    if (members.length >= 3) {
      alert('This is already too crowded! Redirecting home...')
      window.location.href = window.location.origin
      window.location.reload()
    }
    const isController = members.length === 2
    if (isController) this.emit('isController')
    this.emit('isLoaded')
    this.startWebRtc(isController)
  }

  sendMessage = (message: any) => {
    this.drone.publish({
      room: this.roomName,
      message,
    })
  }

  takePicture = () => {
    this.drone.publish({
      room: this.roomName,
      message: { picture: true },
    })
  }

  localDescCreated = (desc: any) => {
    this.pc
      .setLocalDescription(desc)
      .then(() => this.sendMessage({ sdp: this.pc.localDescription }))
  }

  startWebRtc = (isController: boolean) => {
    this.pc = new RTCPeerConnection(configuration)
    this.pc.onicecandidate = event => {
      if (event.candidate) {
        this.sendMessage({ candidate: event.candidate })
      }
    }

    if (isController) {
      this.pc.onnegotiationneeded = () => {
        this.pc.createOffer().then(this.localDescCreated)
      }
    }

    this.pc.ontrack = event => {
      const stream = event.streams[0]
      if (isController) this.emit('setTrack', stream)
    }

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      stream.getTracks().forEach(track => {
        this.track = track
        this.pc.addTrack(track, stream)
      })
      if (!isController) this.emit('setTrack', stream)
    })

    this.room.on('data', (message: any, client: any) => {
      if (client.id === this.drone.clientId) {
        return
      }

      if (message.sdp) {
        // This is called after receiving an offer or answer from another peer
        this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(() => {
          // When receiving an offer lets answer it
          if (this.pc.remoteDescription.type === 'offer') {
            this.pc.createAnswer().then(this.localDescCreated)
          }
        })
      } else if (message.candidate) {
        // Add the new ICE candidate to our connections remote description
        this.pc.addIceCandidate(new RTCIceCandidate(message.candidate))
      } else if (message.picture) {
        const imageCapture = new window['ImageCapture'](this.track)
        imageCapture.takePhoto().then((blob: Blob) => {
          saveAs(blob, `remote-picture_${Date.now()}.png`)
        })
      }
    })
  }
}
