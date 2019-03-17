import { saveAs } from 'file-saver'

const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302', // Google's public STUN server
    },
  ],
}

const constraints = { video: { facingMode: 'environment' } }

export class Drone {
  roomName: string
  videoElement: HTMLVideoElement
  pc: webkitRTCPeerConnection
  drone: any
  room: any
  track: MediaStreamTrack

  constructor(videoElement: HTMLVideoElement) {
    this.roomName = `observable-${window.location.hash.substring(1)}`
    this.videoElement = videoElement
    this.drone = new window['ScaleDrone']('tauc0xbyLWJcbinO')
    this.drone.on('open', this.handleOpen)
  }

  handleOpen = () => {
    this.room = this.drone.subscribe(this.roomName)
    this.room.on('members', this.handleMembers)
  }

  handleMembers = (members: any[]) => {
    if (members.length >= 3) {
      return alert('The room is full')
    }
    const isController = members.length === 2
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
      this.videoElement.srcObject = stream
    }

    if (!isController) {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        stream.getTracks().forEach(track => {
          this.track = track
          this.pc.addTrack(track, stream)
        })
      })
    }

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
