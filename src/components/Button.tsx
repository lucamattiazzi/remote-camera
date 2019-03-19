import * as React from 'react'
import { EventFunction } from '../lib/utils'

type Props = {
  onClick?: EventFunction
  className: string
  symbol: string
}

const voidFn = () => {}

export const Button = (props: Props) => {
  return (
    <div
      className={`absolute pointer white flex flex-column items-center justify-center f1 ${
        props.className
      }`}
      onClick={props.onClick || voidFn}
    >
      {props.symbol}
    </div>
  )
}
