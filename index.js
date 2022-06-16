const { app, globalShortcut } = require('electron')
const Bot = require('./bot.js')

app.whenReady().then(async () => {
  bot = new Bot('https://universe.flyff.com/play', 20, 40)
  bot.play()

  // heal
  globalShortcut.register('Alt+1', () => {
    bot.heal()
    console.log('Healing....')
  })

  // buff
  globalShortcut.register('Alt+3', () => {
    bot.buff()
    console.log('Buffing...')
  })

  // enable auto buff with random number
  globalShortcut.register('Home', () => {
    console.log('Auto buff enabled... ')
    bot.enableAutoBuff()
  })

  // disable auto buff with random number
  globalShortcut.register('End', () => {
    bot.disableAutoBuff()
  })

  // Check whether a shortcut is registered.
  if (globalShortcut.isRegistered('Alt+1')) {
    console.log('Heal regitered')
  }

  if (globalShortcut.isRegistered('Alt+3')) {
    console.log('Heal registered')
  }

  if (globalShortcut.isRegistered('Home')) {
    console.log('Auto buff registered')
  }

  if (globalShortcut.isRegistered('End')) {
    console.log('Disable auto buff registered')
  }
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  // globalShortcut.unregister('CommandOrControl+1')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})