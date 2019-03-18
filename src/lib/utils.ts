export type InfoProps = {
  toggleInfo: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  toggleToast: (message: string) => void
}

export const copyToClipboard = (str: string) => () => {
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

const randomWords = require('random-words')

export const generateHash = (): string => {
  const words = randomWords(3) as string[]
  return words.join('-')
}
