import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import 'modern-normalize'
import '@accurat/tachyons-lite'
import 'tachyons-extra'
import 'reset.css'
import 'style.css'

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
