import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import 'modern-normalize'
import '@accurat/tachyons-lite'
import 'tachyons-extra'
import 'reset.css'
import 'style.css'

function renderApp() {
  const hash = window.location.hash
  if (!hash) {
    window.location.hash = Math.random().toString(16)
  }
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
