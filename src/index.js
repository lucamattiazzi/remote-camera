import 'main'

if ('serviceWorker' in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log('SW found')
  } else {
    navigator.serviceWorker
      .register('sw.js', {
        scope: './',
      })
      .then(reg => {
        console.log(`SW registered: ${reg.scope}`)
      })
  }
}
