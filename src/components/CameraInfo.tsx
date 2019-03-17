import * as React from 'react'
import { copyToClipboard, InfoProps } from '../lib/utils'
import { Info } from './Info'

export const CameraInfo = (props: InfoProps) => (
  <Info {...props}>
    <div>To remote control the camera,</div>
    <div>use another device to go to this room:</div>
    <div className="b pv4" onClick={copyToClipboard(window.location.href)}>
      {window.location.hash}
    </div>
    <div>(click to copy the link!)</div>
  </Info>
)
