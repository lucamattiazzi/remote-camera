import * as React from 'react'

interface Props {
  value: number
}

export const Countdown = (props: Props) => <div className="absolute f2 centered">{props.value}</div>
