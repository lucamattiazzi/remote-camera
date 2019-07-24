const randomWords = require('random-words')

export type EventFunction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

export type InfoProps = {
  toggleInfo: EventFunction
  toggleToast: (message: string) => void
}

export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const generateHash = (): string => {
  const words = randomWords(3) as string[]
  return words.join('-')
}

export const delayed = (fn: Function, delay: number) => () => setTimeout(fn, delay)

export const sendToHashed = () => {
  const hash = generateHash()
  window.location.hash = hash
}
