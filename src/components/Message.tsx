import * as React from 'react'
import { InfoProps } from '../lib/utils'

interface Props {
  text: string
  className: string
}

export const Message = (props: Props) => (
  <div className={`absolute pv3 pl3 pr5 bg-whitey redder toasty top-3 ${props.className}`}>
    {props.text}
  </div>
)
