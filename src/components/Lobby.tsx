import * as React from 'react'
import { sendToHashed } from '../lib/utils'

export const Lobby = () => (
  <div className="w-100 h-100 bg-green-blue flex flex-column justify-around items-center f5">
    <div className="w-80 pt3 pb4 flex flex-column items-center justify-center">
      <h2>What is this?</h2>
      <div className="tc pb3">
        <b>ControlYourSelfie</b> will allow you to take a selfie using your phone <b>camera</b> from
        any other phone.
      </div>
      <div className="tc pb3">
        With the camera device{' '}
        <b className="pointer" onClick={sendToHashed}>
          click here
        </b>{' '}
        to reach your dedicated page, then copy the link and send it to the <b>controller</b>.
      </div>
      <div className="tc">
        The controller will see what the camera sees, and can take a picture with a click on the
        video.
      </div>
    </div>
    <div className="w-80 f3 flex justify-center items-center pointer" onClick={sendToHashed}>
      Click Here to start!
    </div>
  </div>
)
