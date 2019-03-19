import * as React from 'react'
import { copyToClipboard, InfoProps } from '../lib/utils'
import { Info } from './Info'

export const CameraInfo = (props: InfoProps) => {
  const copy = () => {
    copyToClipboard(window.location.href)
    props.toggleToast('Copied!')
  }
  return (
    <Info {...props}>
      <h2>Controls</h2>
      <div className="tc pb3 w-80">
        To remote control the camera use another device to go to this link:{' '}
        <div className="f4 b pv4 pointer" onClick={copy}>
          {window.location.hash}
        </div>
        (click to copy the link!)
      </div>
    </Info>
  )
}
