import * as React from 'react'
import { InfoProps } from '../lib/utils'
import { Info } from './Info'

export const ControllerInfo = (props: InfoProps) => (
  <Info {...props}>
    <h2>Controls</h2>
    <div className="tc pb3 w-80">
      To take a picture, simply click on the camera button! If you want to add a delay, click on the
      watch to take a picture in 5 seconds.
    </div>
  </Info>
)
