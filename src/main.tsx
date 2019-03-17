import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import 'modern-normalize'
import '@accurat/tachyons-lite'
import 'tachyons-extra'
import 'reset.css'
import 'style.css'
const randomWords = require('random-words')

const generateHash = (): string => {
  const words = randomWords(3) as string[]
  return words.join('-')
}

function renderApp() {
  const hash = window.location.hash
  if (!hash) {
    window.location.hash = generateHash()
  }
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
