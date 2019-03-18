import * as React from 'react'
import { copyToClipboard, InfoProps } from '../lib/utils'
import { Info } from './Info'

export const CameraInfo = (props: InfoProps) => {
  const copy = () => {
    props.toggleToast('Copied!')
    copyToClipboard(window.location.href)
  }
  return (
    <Info {...props}>
      <div>To remote control the camera,</div>
      <div>use another device to go to this room:</div>
      <div className="b pv4 pointer" onClick={copy}>
        {window.location.hash}
      </div>
      <div>(click to copy the link!)</div>
    </Info>
  )
}
