import * as React from 'react'
import { InfoProps } from '../lib/utils'
import { Info } from './Info'

export const ControllerInfo = (props: InfoProps) => (
  <Info {...props}>
    <div>To take a picture,</div>
    <div>simply click on the video feed!</div>
  </Info>
)
