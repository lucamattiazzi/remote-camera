import * as React from 'react'
import { Camera } from './Camera'
import { Lobby } from './Lobby'

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('hashchange', () => this.forceUpdate())
  }

  render() {
    console.log('rerender!')
    const hasHash = window.location.hash && window.location.hash.length > 1
    return hasHash ? <Camera /> : <Lobby />
  }
}
